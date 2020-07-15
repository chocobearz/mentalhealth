from sklearn.model_selection import train_test_split
import argparse
import pandas as pd

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

post = posts.dropna()

# for now just weighted afinn score

features = posts['afinnScore']
rating = posts['rating']

featureTrain, featureTest, labelTrain, labelTest = train_test_split(
    features,
    rating,
    test_size=0.20
  )

confirm correct sizes
#print (featureTrain.shape, labelTrain.shape)
#print (featureTest.shape, labelTest.shape)
