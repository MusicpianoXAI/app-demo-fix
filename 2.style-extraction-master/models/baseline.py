import torch
import torch.nn as nn
from torch import cuda


class Baseline(nn.Module):

    def __init__(self, input_size, output_size, rnn_num_layers, rnn_num_nodes, linear_num_layers=1,
                 linear_num_nodes=100, dropout=0):
        super(Baseline, self).__init__()

        self.input_arguments = locals()
        del self.input_arguments['self']
        del self.input_arguments['__class__']

        self.input_size = input_size
        self.output_size = output_size
        self.rnn_num_layers = rnn_num_layers
        self.rnn_num_nodes = rnn_num_nodes
        self.linear_num_layers = linear_num_layers
        self.linear_num_nodes = linear_num_nodes
        self.rnn = nn.GRU(input_size, rnn_num_nodes, rnn_num_layers, batch_first=True)
        self.fc = self.get_linear_layers()
        self.dropout = nn.Dropout(dropout)
        self.device = 'cuda' if cuda.is_available() else 'cpu'
        self.cuda() if cuda.is_available() else None

    def forward(self, x):
        two_dimensional = x.ndim == 2
        if two_dimensional:
            x = torch.unsqueeze(x, 0)
        h0 = torch.zeros(self.rnn_num_layers, x.size(0), self.rnn_num_nodes, device=self.device)
        out, _ = self.rnn(x, h0)
        out = out[:, -1, :]
        out = self.dropout(out)
        out = self.fc(out)
        if two_dimensional:
            return torch.squeeze(out, 0)
        return out

    def save(self, path, **kwargs):
        save_dict = {
            'state_dict': self.state_dict(),
            'class': self.__class__,
            'input_arguments': self.input_arguments
        }
        save_dict.update(kwargs)
        torch.save(save_dict, path)
        print(f'Model was saved')

    def get_linear_layers(self):
        if self.linear_num_layers > 1:
            sequence = [
                nn.Linear(self.rnn_num_nodes, self.linear_num_nodes),
                nn.ReLU()
            ]
            for i in range(self.linear_num_layers - 2):
                sequence += [
                    nn.Linear(self.linear_num_nodes, self.linear_num_nodes),
                    nn.ReLU()
                ]
            sequence += [
                nn.Linear(self.linear_num_nodes, self.output_size)
            ]
        else:
            sequence = [
                nn.Linear(self.rnn_num_nodes, self.output_size)
            ]

        return nn.Sequential(*sequence)
