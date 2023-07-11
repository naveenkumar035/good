from flask import Flask, request, jsonify
from system import predict_class, get_response, load
from train import load_intents
from intents import get_intents , store_intents
import json
from flask_cors import CORS

app = Flask(__name__)

@app.route('/api/chatbot', methods=['GET', 'POST'])
def chatbot():
    data = request.get_json()
    message = data['message']
    collection = data['collection']
    intents = get_intents(collection)
    store_intents(collection, intents)
    intents_json = json.dumps({'intents': intents})
    load_intents(collection, intents_json)
    model, words, classes = load(collection, 'words', 'classes', 'model')
    ints = predict_class(message, model, classes,words)
    res = get_response(ints, intents)
    return jsonify({'response': res})


@app.after_request
def add_cors_headers(response):
    response.headers.add('Access-Control-Allow-Origin', '*')
    response.headers.add('Access-Control-Allow-Headers', 'Content-Type,Authorization')
    response.headers.add('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    return response

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0')