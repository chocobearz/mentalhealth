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

    #probabilities the post belongs to each category
    probs = softmax((
      np.array(self.weights) @ 
      np.array(scores) + 
      np.array(self.intercepts)
    ))
    #assign to category with maximum probability
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
    #larger difference in user input and predicted, larger learning rate
    if (self.journalScore == 1 and self.currentState in range(-5,-3)) or (self.journalScore == -3 and self.currentState in range(0,6)):
      learningRate = 0.01
    else:
      learningRate = 0.001

    #user input mapped to number of classes for model as indexes
    y = self.mapInputToRating()
    x = np.array(scores, dtype = np.float64)

    #run gradient descent for weights adjusting to user input
    for i in range(100):
      weightsGrad, interceptGrad = jax.grad(
          lambda w, b, x, y : -jax.nn.softmax(w @ x + b)[y], (0, 1)
      )(
          self.weights, self.intercepts, x, y
      )
      self.weights = self.weights - learningRate * weightsGrad
      self.intercepts = self.intercepts - learningRate * interceptGrad

  def assessState(self):
    #if is a crisis immediately move to crisis category
    if self.journalScore == -3:
      self.currentState = -5
      return
    #take smaller steps in sad direction as -4 and -5 will give bigger steps
    elif self.journalScore < 0:
      longTermState = (self.currentState - 0.1)
    else:
    #take a slightly larger step as the entry is always a value of 1 if happy
      longTermState = (self.currentState + 0.2)
    if longTermState >= 5:
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
