import pandas as pd

#import csvs
sadData = pd.read_csv("labeledSadPosts.csv")
happyData = pd.read_csv("labeledHappyPosts.csv")

#add the type to the id so they remain unique
sadData['id'] = sadData['id'].apply(lambda x: "{}{}".format(x, 'sad'))
happyData['id'] = happyData['id'].apply(lambda x: "{}{}".format(x, 'happy'))

#combine the datasets
allData = sadData.append(happyData)

#remove any without entries
allData = allData.dropna()

allData.to_csv('cleanRedditPosts.csv')