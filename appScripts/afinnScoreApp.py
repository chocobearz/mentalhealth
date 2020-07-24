from afinnWrapper import weightedScore

def afinnScore(journalEntry):
  """for a journal entry a series of scores are calculated based on the
    accumulation of scored words from a lexicon

    Parameters:

    journalEntry (str) : user journal entry

    Returns:

    list: a list of the calculated lexicon scores
  """

  afinnScore = []
  researchScore = []
  emergencyScore = []
  absolutismScore = []
  
  #calculate the sentiment score for each lexicon
  afinnScore = weightedScore(journalEntry, 'en')
  researchScore = weightedScore(journalEntry, 're')
  emergencyScore = weightedScore(journalEntry, 'em')
  absolutismScore = weightedScore(journalEntry, 'ab')

  #save to csv
  return [afinnScore, researchScore, emergencyScore, absolutismScore]

