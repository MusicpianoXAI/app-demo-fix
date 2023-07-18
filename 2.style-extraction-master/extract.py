import subprocess
from mido import Message, MidiFile, MidiTrack

import numpy as np
import pandas as pd
import torch

from utils.loading import load_model
from utils.paths import path_from_root
from utils.preprocessing import get_features_from_file, compute_all_features, get_numeric_features, \
    compute_deviations_from_average_performance


def create_performance_midi(notes):
    mid = MidiFile()
    track = MidiTrack()
    mid.tracks.append(track)

    notes_df = pd.DataFrame(notes)

    notes_df.fillna(inplace=True, method='ffill')
    for i, row in notes_df.iterrows():
        track.append(
            Message(row['noteOnOff'], note=int(row['note']), velocity=int(row['velocity']),
                    time=int(row['time'])))
    mid.save('my.mid')


def get_model(model_name='best.pkl'):
    model_path = path_from_root('models', model_name)
    model = load_model(model_path)
    return model


def align_score(score_name='D960', performance_name='my'):
    process = subprocess.Popen(['./Align.sh', score_name, performance_name], stdout=subprocess.DEVNULL)
    process.wait()


def extract_deviations(file_name='my_match.txt'):
    features = get_features_from_file(file_name)
    all_features = compute_all_features(features)
    numeric_features = get_numeric_features(all_features)
    deviations = compute_deviations_from_average_performance(numeric_features)
    return deviations


def get_output(model, deviations):
    model_input = torch.from_numpy(deviations.to_numpy(dtype=np.float32))
    model_input = torch.nan_to_num(model_input)
    model_output = model(model_input)
    model_output = model_output.detach().numpy()
    return model_output


def create_output_csv(model_output, name='my.csv'):
    df = pd.read_csv('dimensions.csv')
    df['value'] = model_output
    df.to_csv(name)


def full_pipeline(notes):
    create_performance_midi(notes)
    align_score()
    inputs = extract_deviations()
    model = get_model()
    outputs = get_output(model, inputs)
    create_output_csv(outputs)
