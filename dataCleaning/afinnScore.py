import pandas as pd
from afinn import Afinn
import argparse

#load afinn class
afinn = Afinn()

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
sentimentScores = []

#calculate the sentiment score for each post and keep it with the true score
for i, post in enumerate(posts):
  scorePair = [
    data['id'][i],
    data['type'][i],
    afinn.score(post),
    data['rating'][i]
  ]
  sentimentScores.append(scorePair)

print(sentimentScores)
#store as pandas dataframe
df = pd.DataFrame(sentimentScores)
df.columns = ['id','type','afinnScore','rating']

print(df)
#save to csv
df.to_csv('redditAfinnScores.csv')