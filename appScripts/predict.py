from model import model
import argparse
from afinnScoreApp import afinnScore
import json
import numpy as np

'''predict mental state based on a journal entry'''

parser = argparse.ArgumentParser()
parser.add_argument(
  "longTermScore",
  help="string of journal entry"
)
parser.add_argument(
  "text",
  help="string of journal entry"
)
parser.add_argument(
  "weights",
  help="current model weights"
)
parser.add_argument(
  "intercepts",
  help="current model intercepts"
)
args = parser.parse_args()

longTermScore = float(args.longTermScore)
text = args.text
weights = np.array(json.loads(args.weights))
intercepts = np.array(json.loads(args.intercepts))

#initialize model class
mod = model(weights, intercepts, longTermScore)

#get afinn scores for new entry
scores = afinnScore(text)

#get mental health prediction based on scores
mod.predict(scores)

print(mod.journalScore)

#calculate new current score from weighted average
mod.assessState()

print(mod.currentState)

