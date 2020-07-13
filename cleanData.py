import pandas as pd

sadData = pd.read_csv("labeledSadPosts.csv")
happyData = pd.read_csv("labeledHappyPosts.csv")

sadData['id'] = sadData['id'].apply(lambda x: "{}{}".format(x, 'sad'))
happyData['id'] = happyData['id'].apply(lambda x: "{}{}".format(x, 'happy'))

allData = sadData.append(happyData)

allData = allData.dropna()
