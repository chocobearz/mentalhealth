from sklearn.model_selection import train_test_split
import argparse
import pandas as pd
from sklearn.linear_model import LogisticRegression
import seaborn as sns
import numpy as np
import matplotlib.pyplot as plt
from sklearn import metrics
import statsmodels.api as sm

#allow for user to enter csv
parser = argparse.ArgumentParser()
parser.add_argument(
  "csvPath",
  help="relative path to the csv to be loaded"
)
args = parser.parse_args()

csvPath = args.csvPath

#read in data
posts = pd.read_csv(csvPath)

posts = posts.dropna()

# for now just weighted afinn score

features = posts.drop(['rating', 'id', 'type', 'text'], axis = 1)
rating = posts['rating']

featureTrain, featureTest, labelTrain, labelTest = train_test_split(
    features,
    rating,
    test_size=0.20
  )

#confirm correct sizes
#print (featureTrain.shape, labelTrain.shape)
#print (featureTest.shape, labelTest.shape)

logisticRegr = LogisticRegression()

logisticRegr.fit(featureTrain, labelTrain)

predictions = logisticRegr.predict(featureTest)

score = logisticRegr.score(featureTest, labelTest)
print(score)

cm = metrics.confusion_matrix(labelTest, predictions)

plt.figure(figsize=(9,9))
sns.heatmap(cm, annot=True, fmt=".3f", linewidths=.5, square = True)
plt.ylabel('Actual label')
plt.xlabel('Predicted label')
all_sample_title = 'Accuracy Score: {0}'.format(score)
plt.title(all_sample_title, size = 15)

plt.show()
