import numpy as np
from afinn import Afinn


def afinnScore(text) :
	afinn = Afinn(emoticons=True)
	return afinn.score(text)

def weightedScore(fullText) :
	textList = fullText.split(".")
	weights = np.linspace(2,2.5,len(textList))
	afinnTotal = 0
	for i in range(len(textList)):
		wordLength = len(textList[i].split())
		if (wordLength == 0):
			wordLength = 1
		if (i < len(textList)/2):
			afinnTotal += (afinnScore(textList[i])) / wordLength
		else :
			afinnTotal += (afinnScore(textList[i]) * weights[i]) / wordLength
	return afinnTotal / len(textList)