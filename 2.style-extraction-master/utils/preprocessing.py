import pandas as pd

from utils.paths import AVERAGE_PERFORMANCE_FILE_PATH

MATCH_COLUMN_NAMES = ['id', 'time_onset', 'time_offset', 'pitch', 'velocity_onset', 'velocity_offset', 'channel',
                      'match_status', 'time_score', 'note_id', 'error_index', 'skip_index']
INITIAL_NUMERIC_FEATURES_COLUMN_NAMES = ['time_onset', 'time_offset', 'velocity_onset', 'velocity_offset']
COMPUTED_NUMERIC_FEATURES_COLUMN_NAMES = ['duration', 'inter_onset_interval', 'offset_time_duration']
NUMERIC_FEATURES_COLUMN_NAMES = INITIAL_NUMERIC_FEATURES_COLUMN_NAMES + COMPUTED_NUMERIC_FEATURES_COLUMN_NAMES
ALL_FEATURE_COLUMN_NAMES = MATCH_COLUMN_NAMES + COMPUTED_NUMERIC_FEATURES_COLUMN_NAMES

QUESTION_COLUMNS = ['Question_1_1_1', 'Question_2_1_1',
                    'Question_2_2_1', 'Question_3_1_1', 'Question_3_2_1', 'Question_3_3_1',
                    'Question_4_1_1', 'Question_4_2_1', 'Question_4_3_1', 'Question_5_1_1',
                    'Question_5_2_1', 'Question_5_3_1', 'Question_5_4_1', 'Question_5_5_1', 'Question_6_1_1',
                    'Question_6_2_1', 'Question_6_3_1', 'Question_6_4_1',
                    'Question_6_5_1', 'Question_7_1_1', 'Question_7_2_1', 'Question_7_3_1',
                    'Question_8_1_1', 'Question_8_2_1', 'Question_9_1_1']


def get_features_from_file(file_path):
    lines = []
    with open(file_path) as f:
        lines = f.readlines()
    notes = []
    for line in lines:
        if '//' not in line:
            data = line.replace('\n', '').split('\t')
            notes.append(data)
    notes_df = pd.DataFrame(notes, columns=MATCH_COLUMN_NAMES)
    # Fix data types for dataframe
    notes_df = notes_df.astype({
        'id': int,
        'time_onset': float,
        'time_offset': float,
        'pitch': str,
        'velocity_onset': int,
        'velocity_offset': int,
        'channel': int,
        'match_status': int,
        'time_score': int,
        'note_id': str,
        'error_index': int,
        'skip_index': str
    })

    return notes_df.set_index('id', drop=False)


def compute_all_features(features: pd.DataFrame) -> pd.DataFrame:
    # Add duration feature
    features['duration'] = features['time_offset'] - features['time_onset']

    # Add Inter Onset Interval
    features['inter_onset_interval'] = features['time_onset'].diff()

    # Add Offset Time Duration
    features['offset_time_duration'] = features['time_onset'].shift() - features['time_offset']
    return pd.DataFrame(features,
                        columns=MATCH_COLUMN_NAMES + COMPUTED_NUMERIC_FEATURES_COLUMN_NAMES)


def get_numeric_features(all_features: pd.DataFrame) -> pd.DataFrame:
    aligned_mask = all_features['error_index'] == 0
    aligned_notes = pd.DataFrame(all_features[aligned_mask], columns=all_features.columns).set_index('note_id',
                                                                                                     drop=True)
    return pd.DataFrame(aligned_notes[NUMERIC_FEATURES_COLUMN_NAMES], columns=NUMERIC_FEATURES_COLUMN_NAMES)


def adjust_time(df):
    new_df = df.copy()
    min_onset = new_df['time_onset'].min()
    new_df['time_onset'] = new_df.apply(
        lambda row: row['time_onset'] - min_onset,
        axis=1)
    new_df['time_offset'] = new_df.apply(
        lambda row: row['time_offset'] - min_onset,
        axis=1)
    return new_df


def compute_deviations_from_average_performance(numeric_features: pd.DataFrame) -> pd.DataFrame:
    average_performance = pd.read_csv(AVERAGE_PERFORMANCE_FILE_PATH, index_col=0)

    common_notes_mask_average = average_performance.index.isin(numeric_features.index)
    common_notes_mask_performance = numeric_features.index.isin(average_performance.index)

    average_adjusted = adjust_time(average_performance[common_notes_mask_average])
    performance_adjusted = adjust_time(numeric_features[common_notes_mask_performance])

    return performance_adjusted - average_adjusted


def scale_to_model_input(x, min_num=1, max_num=7):
    # Normalizes x from -1 to 1
    return 2 * (x - min_num) / (max_num - min_num) - 1


def scale_to_tags(x, min_num=1, max_num=7):
    # Rescales normalized input
    return 0.5 * (max_num - min_num) * (x + 1) + min_num


def get_performer(filename):
    return filename.replace('.', '_').split('_')[4]


def get_segment(filename):
    return filename.replace('.', '_').split('_')[5]


def get_movement(filename):
    return filename.replace('.', '_').split('_')[2]


def get_bars(filename):
    return filename.replace('.', '_').split('_')[3]


def get_file_info(filename):
    return get_performer(filename), get_segment(filename), get_movement(filename), get_bars(filename)
