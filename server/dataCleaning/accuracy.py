import pandas as pd


#read in data
data = pd.read_csv("../data/redditWeightedAfinnScores.csv", sep=r'\s*,\s*',
                           header=0, encoding='ascii', engine='python')

#extract posts
scores = list(data['type'])

sadAccurate = 0
sadError = 0
happyAccurate = 0
happyError = 0
#calculate the sentiment score for each post and keep it with the true score
for i, score in enumerate(scores):
  if (data['type'][i] == "sad") :
    if(data['afinnScore'][i] < 0):
      sadAccurate += 1
    else:
      sadError += 1
  elif (data['type'][i] == "happy") :
    if(data['afinnScore'][i] > 0):
      happyAccurate += 1
    else:
      happyError += 1

sadAccuracy = (sadAccurate / (sadAccurate + sadError))
happyAccuracy = (happyAccurate / (happyAccurate + happyError))
totalAccuracy = ((sadAccurate + happyAccurate) / (happyAccurate + sadAccurate + happyError + sadError))
print("sadAccurate: ", sadAccurate)
print("sadError: ", sadError)
print("happyAccurate: ", happyAccurate)
print("happyError: ", happyError)
print("happyAccuracy: ", happyAccuracy)
print("sadAccuracy: ", sadAccuracy)
print("totalAccuracy: ", totalAccuracy)
print("\n\n")


sadAccurate = 0
sadError = 0
happyAccurate = 0
happyError = 0
level1Accurate = 0
level1Error = 0
level2Accurate = 0
level2Error = 0
level3Accurate = 0
level3Error = 0
#calculate the sentiment score for each post and keep it with the true score

for i, score in enumerate(scores):
  if (data['rating'][i] == -1.0) :
    if (data['afinnScore'][i] < 0):
      level1Accurate += 1
    else:
      level1Error += 1
  elif (data['rating'][i] == -2.0) :
    if (data['afinnScore'][i] < 0):
      level2Accurate += 1
    else:
      level2Error += 1
  elif (data['rating'][i] == -3.0):
    if (data['afinnScore'][i] < 0):
      level3Accurate += 1
    else:
      level3Error += 1
level1Accuracy = (level1Accurate / (level1Accurate + level1Error))
level2Accuracy = (level2Accurate / (level2Accurate + level2Error))
level3Accuracy = (level3Accurate / (level3Accurate + level3Error))
print("level1Accuracy: ", level1Accuracy)
print("level2Accurate: ", level2Accuracy)
print("level3Accurate: ", level3Accuracy)