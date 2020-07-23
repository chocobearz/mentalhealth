from model import model
import argparse
from afinnScoreApp import afinnScore

'''When a new user is added to the database add the training model weights to
the database as their model'''

def pred(longTermScore, text, weights, intercepts):
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
  
  longTermScore = args.longTermScore
  text = args.text
  weights = args.weights
  intercepts = args.intercepts

  mod = model(weights, intercepts, longTermScore)

  scores = afinnScore(text)

  print(scores)

  mod.predict(scores)

  print(mod.journalScore)

  mod.assessState()

  #print(mod.currentState)
