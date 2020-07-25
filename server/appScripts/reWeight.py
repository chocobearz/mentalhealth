from model import model
import argparse
from afinnScoreApp import afinnScore
import json
import numpy as np

'''every 5th journal entry run a prediction and reweight model based on user
input'''

parser = argparse.ArgumentParser()
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
parser.add_argument(
  "userInput",
  help="user input score for how they are feeling"
)
args = parser.parse_args()

userInput = int(args.userInput)
text = args.text
weights = np.array(json.loads(args.weights), dtype = np.float64)
intercepts = np.array(json.loads(args.intercepts), dtype = np.float64)

#initialize model class
mod = model(weights, intercepts, userInput)

#get afinn scores for new entry
scores = afinnScore(text)

#get mental health prediction based on scores
mod.predict(scores)

print(mod.journalScore)

#current score is set with user input
print(mod.currentState)

#reweight the model based on the user input to reinforce the learning
mod.reWeight(scores)

print(mod.weights)

