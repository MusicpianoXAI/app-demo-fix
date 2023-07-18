import os
from pathlib import Path


def get_current_directory_path():
    directory_path, filename = os.path.split(__file__)
    return os.path.join(directory_path, "")


def get_root_folder():
    return os.path.join(Path(__file__).parent.parent, '')


def path_from_root(*args):
    return os.path.join(get_root_folder(), *args)


def get_files_in_folder(path):
    return [f for f in os.listdir(path) if os.path.isfile(os.path.join(path, f))]


AVERAGE_PERFORMANCE_FILE_NAME = 'average_performance.csv'
AVERAGE_PERFORMANCE_FILE_PATH = path_from_root(AVERAGE_PERFORMANCE_FILE_NAME)
