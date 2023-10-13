import random 
import json
import pickle
import numpy as np
import nltk    
nltk.download('punkt')
nltk.download('wordnet')
from nltk.stem import WordNetLemmatizer
from tensorflow import keras
from keras.models import Sequential
from keras.layers  import Dense, Activation, Dropout
from keras.optimizers import  SGD
lemmatizer = WordNetLemmatizer()
import asyncio
import firebase_admin
from firebase_admin import credentials, firestore
import collections
# Initialize Firebase Admin SDK
cred = credentials.Certificate(r'C:\Users\hi\Documents\HuCo\good\huco.json')
firebase_admin.initialize_app(cred)

# Initialize Firestore client
db = firestore.client()

def get_intents(collection_name):
    usertips_ref = db.collection(collection_name).order_by('timestamp')
    mytips_ref = db.collection(collection_name).order_by('timestamp')
    
    usertips = []
    for i, doc in enumerate(usertips_ref.stream()):
        doc_dict = doc.to_dict()
        usertip = doc_dict.get('usertip')
        if usertip is not None:
            usertips.append({'tag': i, 'getUsers': usertip})
        
    mytips = []
    for i, doc in enumerate(mytips_ref.stream()):
        doc_dict = doc.to_dict()
        Mytip = doc_dict.get('Mytip')
        if Mytip is not None:
            mytips.append({'tag': i, 'giveUsers': Mytip})
    
    intents = []
    for i in range(min(len(usertips), len(mytips))):
        intent = {'tag': i, 'getUsers': usertips[i]['getUsers'], 'giveUsers': mytips[i]['giveUsers']}
        intents.append(intent)
        print(intents)
    return intents

def store_intents(collection_name, intents):
    navee_ref = db.collection(collection_name)
    intents_collection_ref = navee_ref.document('intents').collection('intents')
    for intent in intents:
        intents_collection_ref.add(intent)