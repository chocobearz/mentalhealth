import pandas as pd
import argparse

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

print(data.groupby(by='rating').agg('count'))