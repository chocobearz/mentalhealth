from scipy.special import softmax
import numpy as np

def predict(scores):
  """predict an individuals sadess category based on their lexicon scores
  this uses our multinomial regression model that was trained on a combination
  of r/suisidewatch and r/mentalhealth data

  Parameters:

  scores (list) : list of lexicon scores from a journal entry. Afinn Score,
  Emergency Score, Research Score and Abosolutism Score

  Returns:

  int: the sadness category. 1 = happy, -1 = sad, -3 = crisis
  """

  weights = [
    [-0.02807738, 0.0393423, -0.85414827, 0.00677817],
    [-0.02909687, 0.03356314, -0.74487031, 0.00826826],
    [0.05717426, -0.07290543, 1.59901859, -0.01504643]
  ]

  intercepts = [-1.52631775, 0.20101568, 1.32530206]

  probs = softmax((weights @ scores + intercepts))

  if max(probs) == probs[0]:
    return -3
  elif max(probs) == probs[1]:
    return -1
  else:
    return 1
