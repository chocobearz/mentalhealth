from scipy.special import softmax
import jax.numpy as np
import jax

class model:

  def __init__(self, weights, intercepts, inputState, journalScore = None):
    self.weights = weights
    self.intercepts = intercepts
    self.currentState = inputState
    self.journalScore = journalScore

  def predict(self, scores):
    """predict an individuals sadess category based on their lexicon scores
    this uses our multinomial regression model that was trained on a combination
    of r/suisidewatch and r/mentalhealth data

    Parameters:

    scores (list) : list of lexicon scores from a journal entry. Afinn Score,
    Emergency Score, Research Score and Abosolutism Score

    Returns:

    none, updates self.jounralScore with the rating for this journal entry
    """

    probs = softmax((
      np.array(self.weights) @ 
      np.array(scores) + 
      np.array(self.intercepts)
    ))

    if max(probs) == probs[0]:
      self.journalScore = -3
    elif max(probs) == probs[1]:
      self.journalScore = -1
    else:
      self.journalScore = 1

  def reWeight(self, scores):
    """Based on user input update the logsistic model weights using gradient 
    descent

    Parameters:

    scores (list) : list of lexicon scores from a journal entry. Afinn Score,
    Emergency Score, Research Score and Abosolutism Score

    Returns:

    none, updates self.weights and self.intercept
    """
    if (self.journalScore == 1 and self.currentState in range(-5,-3)) or (self.journalScore == -3 and self.currentState in range(0,6)):
      learningRate = 1000000000000000000000000000
      #up to down 116
    else:
      #down to up
      learningRate = 870
      #14 up to down

    print("learningRate = {}".format(learningRate))
    y = self.mapInputToRating()
    x = np.array(scores)

    weightsGrad, interceptGrad = jax.grad(
        lambda w, b, x, y : -jax.nn.softmax(w @ x + b)[y], (0, 1)
    )(
        self.weights, self.intercepts, x, y
    )
    self.weights = self.weights - learningRate * weightsGrad
    self.intercepts = self.intercepts - learningRate * interceptGrad

  def assessState(self, entries):
    if self.journalScore == -3:
      self.currentState = -5
    elif self.journalScore < 0:
      longTermState = (self.currentState + 0.2*self.journalScore)/entries
    else:
      longTermState = (self.currentState + 0.5*self.journalScore)/entries
    if longTermState > = 5:
      self.currentState = 5
    elif longTermState <= -5:
      self.currentState = -5
    else:
      self.currentState = longTermState

  def mapInputToRating(self):
    """Map user input on 5 to -5 scale to index scale for our ratings, 0-2

    Parameters:

    None

    Returns:

    int: mapped state. 0 = crisis, 1 = sad, 2 = happy
    """

    if self.currentState in range(0,6):
      return 2
    elif self.currentState in range (-3,0):
      return 1
    else:
      return 0
