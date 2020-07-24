import numpy as np
from afinn import Afinn


def afinnScore(text, lexicon) :
  afinn = Afinn(lexicon, emoticons=True)
  return afinn.score(text)

def weightedScore(fullText, lexicon) :
  textList = fullText.split(".")
  weights = np.linspace(2,3,len(textList))
  afinnTotal = 0
  for i in range(len(textList)):
    if (i < len(textList)/2):
      afinnTotal += (afinnScore(textList[i], lexicon)) /(len(textList))
    else :
      afinnTotal += (afinnScore(textList[i], lexicon) * (weights[i])) /(len(textList))
  return afinnTotal