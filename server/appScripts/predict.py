from model import model
import argparse
from afinnScoreApp import afinnScore
import json
import numpy as np
import sys 

'''predict mental state based on a journal entry'''

# parser.add_argument(
#   "longTermScore",
#   help="string of journal entry"
# )
# parser.add_argument(
#   "text",
#   help="string of journal entry"
# )
# parser.add_argument(
#   "weights",
#   help="current model weights"
# )
# parser.add_argument(
#   "intercepts",
#   help="current model intercepts"
# )
# args = parser.parse_args()

# longTermScore = float(args.longTermScore)
# text = args.text
# weights = np.array(json.loads(args.weights))
# intercepts = np.array(json.loads(args.intercepts))


longTermScore = float(sys.argv[1])
text = sys.argv[2]
weights = np.array(json.loads(sys.argv[3]))
intercepts = np.array(json.loads(sys.argv[4]))

mod = model(weights, intercepts, longTermScore)

scores = afinnScore(text)

mod.predict(scores)

print(mod.journalScore)

mod.assessState()

print(mod.currentState)
