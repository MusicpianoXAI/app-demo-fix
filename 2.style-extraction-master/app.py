import json

import pandas as pd
from flask import Flask, request, send_from_directory, jsonify
from flask_cors import CORS

from extract import full_pipeline
from utils.paths import path_from_root

app = Flask('style-extractor')
CORS(app)


@app.route('/upload', methods=['POST', 'GET'])
def upload_midi_data():
    if request.method == 'POST':
        notes = json.loads(request.form['notes'])
        try:
            full_pipeline(notes)
            return {'msg': 'Values were computed and stored'}
        except ValueError:
            return {'msg': 'Performance did not match the piece'}, 400
    return {'msg': 'Use a POST request with a CSV'}


@app.route('/values', methods=['GET'])
def download_file():
    return send_from_directory(path_from_root(), 'output.csv')


@app.route('/my-values', methods=['GET'])
def get_my_json():
    df = pd.read_csv('my.csv').fillna('')
    return df.to_dict('index')


@app.route('/ideal-values', methods=['GET'])
def get_ideal_json():
    df = pd.read_csv('ideal.csv').fillna('')
    return df.to_dict('index')

context = ('/etc/ssl/certs/server.crt', '/etc/ssl/private/server.key')
app.run(port=5000, host="0.0.0.0")#, ssl_context=context)

#app.run(port=5000, host="0.0.0.0")