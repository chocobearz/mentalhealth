from scipy.special import softmax
import numpy as np

def predict(x):
  """Choose Move determines what the next optimal move should be, based on the
  maximizing the linear combination from the play statistics of random playouts

  Parameters:

  next_player (string) : the next/first player (X or O) to make a move
  game (tictactoe object): the game board before the play is made

  Returns:

  int: The index of the most optimal location to place a piece on the board
  """

  weights = [
    [-0.02807738, 0.0393423, -0.85414827, 0.00677817],
    [-0.02909687, 0.03356314, -0.74487031, 0.00826826],
    [0.05717426, -0.07290543, 1.59901859, -0.01504643]
  ]

  intercepts = [-1.52631775, 0.20101568, 1.32530206]

  probs = softmax((weights @ x + intercepts))

  if max(probs) == probs[0]:
    return -3
  elif max(probs) == probs[1]:
    return -1
  else:
    return 1
