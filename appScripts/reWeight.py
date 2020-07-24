from model import model
import argparse
from afinnScoreApp import afinnScore
import json
import numpy as np

'''every 5th journal entry run a prediction and reweight model based on user
input'''

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
parser.add_argument(
  "userInput",
  help="user input score for how they are feeling"
)
args = parser.parse_args()

longTermScore = int(args.longTermScore)
userInput = (args.userInputScore)
text = args.text
weights = np.array(json.loads(args.weights))
intercepts = np.array(json.loads(args.intercepts))

mod = model(weights, intercepts, longTermScore)

scores = afinnScore(text)

mod.predict(scores)

print(mod.journalScore)

mod.currentState = userInput

print(mod.currentStaste)




