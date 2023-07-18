import pandas as pd
import torch

from utils.paths import path_from_root
from utils.preprocessing import get_performer, get_segment, get_movement, get_bars
from utils.preprocessing import QUESTION_COLUMNS

DEVICE = torch.device('cuda' if torch.cuda.is_available() else 'cpu')

def load_tags():
    tags_path = path_from_root('data', 'total.csv')
    tags = pd.read_csv(tags_path)
    tags['performer'] = tags.apply(lambda row: get_performer(row['filename']), axis=1)
    tags['segment'] = tags.apply(lambda row: get_segment(row['filename']), axis=1)
    tags['movement'] = tags.apply(lambda row: get_movement(row['filename']), axis=1)
    tags['bars'] = tags.apply(lambda row: get_bars(row['filename']), axis=1)

    return tags[['performer', 'segment', 'movement', 'bars'] + QUESTION_COLUMNS]


def load_model(path):
    saved_dict = torch.load(path, map_location=DEVICE)
    model = saved_dict['class'](**saved_dict['input_arguments'])
    model.load_state_dict(saved_dict['state_dict'])
    model.eval()
    return model
