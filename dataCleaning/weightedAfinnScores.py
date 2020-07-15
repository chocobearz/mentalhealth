import pandas as pd
from afinn import Afinn
from afinnWrapper import weightedScore
#load afinn class
afinn = Afinn()

#read in data
data = pd.read_csv("../data/cleanRedditPosts.csv")

#extract posts
posts = list(data['text'])
sentimentScores = []

#calculate the sentiment score for each post and keep it with the true score
for i, post in enumerate(posts):
  scorePair = [data['id'][i], data['type'][i],weightedScore(post)]
  sentimentScores.append(scorePair)

#store as pandas dataframe
df = pd.DataFrame(sentimentScores)
df.columns = ['id','type','weightedAfinnScore']

#save to csv
df.to_csv('../data/redditWeightedAfinnScores.csv')