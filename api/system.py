import random 
import json
import pickle
import numpy as np
import nltk    
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
from tensorflow import keras
from keras.models import load_model
lemmatizer = WordNetLemmatizer()
from intents import  db
from keras.models import model_from_json


def load(collection_name, words, classes, model):
    collection_ref = db.collection(collection_name)
    doc_ref = collection_ref.document('system_model')
    doc_data = doc_ref.get().to_dict()
    model_architecture = model_from_json(doc_data['model_json'])

    # Load model weights from bytes
    with open('system_model.h5', 'wb') as f:
        f.write(doc_data['model_weights'])
    model_weights = 'system_model.h5'

    # Load model
    model_architecture.load_weights(model_weights)
    doc_ref = collection_ref.document('words')
    doc_data = doc_ref.get().to_dict()

    # Load words from pickle bytes
    words = pickle.loads(doc_data['words_pickle'])
    doc_ref = collection_ref.document('classes')
    doc_data = doc_ref.get().to_dict()

    # Load classes from pickle bytes
    classes = pickle.loads(doc_data['classes_pickle'])
    print(words)
    return model_architecture, words, classes


def clean_up_sentence(sentence,words):
    sentence_words = nltk.word_tokenize(sentence)
    sentence_words = [lemmatizer.lemmatize(word) for word in sentence_words]
    return sentence_words

def bag_of_words(sentence,words):
    sentence_words = clean_up_sentence(sentence,words)
    bag = [0] * len(words)
    for w in sentence_words:
        for i, word in enumerate(words):
            if word == w:
                bag[i] = 1
    return np.array(bag)

def predict_class(sentence,model,classes,words):
    bow = bag_of_words(sentence,words)
    res = model.predict(np.array([bow]))[0]
    ERROR_THRESHOLD = 0.25
    results = [[i,r] for i, r in enumerate(res) if r > ERROR_THRESHOLD]

    results.sort(key=lambda x: x[1], reverse=True)
    return_list = []
    for r in results:
        return_list.append({'intent': classes[r[0]],  'probability': str(r[1])})
    return return_list

def get_response(intents_list, intents):
   tag = intents_list[0]['intent']
   list_of_intents = intents
   for intent in list_of_intents:
        if intent['tag'] == tag:
              result = (intent['giveUsers'])
   return result



    
     