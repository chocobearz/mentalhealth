import pandas as pd
from afinn import Afinn
import argparse
from afinnWrapper import weightedScore

lexicons = ['en', 'em', 're', 'ab']

#allow for user to enter csv
parser = argparse.ArgumentParser()
parser.add_argument(
  "csvPath",
  help="relative path to the csv to be loaded"
)
args = parser.parse_args()

csvPath = args.csvPath

#read in data
data = pd.read_csv(csvPath)

#extract posts
posts = list(data['text'])
afinnScore = []
researchScore = []
emergencyScore = []
absolutismScore = []

#calculate the sentiment score for each post and keep it with the true score
for lexicon in lexicons:
  for post in posts:
    score = weightedScore(post, lexicon)
    if lexicon == 'en':
      afinnScore.append(score)
    elif lexicon == 're':
      researchScore.append(score)
    elif lexicon == 'em':
      emergencyScore.append(score)
    else:
      absolutismScore.append(score)

#store as pandas dataframe
data['afinnScore'] = afinnScore
data['researchScore'] = researchScore
data['emergencyScore'] = emergencyScore
data['absolutismScore'] = absolutismScore

#save to csv
data.to_csv('../data/redditAfinnScores.csv')
