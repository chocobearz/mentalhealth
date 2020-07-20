import pandas as pd
from afinn import Afinn
import argparse

#load afinn class for base lexicon
afinnBase = Afinn(emoticons=True)
#load emergency lexicon
afinnEm = Afinn('em')
#load research lexicon
afinnRe = Afinn('re')
#load absolutism lexicon
afinnAb = Afinn('ab')

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
for i, post in enumerate(posts):
  afinnScore.append(afinnBase.score(post))
  researchScore.append(afinnRe.score(post))
  emergencyScore.append(afinnEm.score(post))
  absolutismScore.append(afinnAb.score(post))

#store as pandas dataframe
data['afinnScore'] = afinnScore
data['researchScore'] = researchScore
data['emergencyScore'] = emergencyScore
data['absolutismScore'] = absolutismScore

#save to csv
data.to_csv('../data/redditAfinnScores.csv')
