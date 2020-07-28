const apiURL = "https://ink-well.herokuapp.com"
//const apiURL = "https://localhost:3030"
const googleAPIURL =   "https://language.googleapis.com/v1/documents:analyzeEntities"
export async function getSentimentLabel(journalEntry) {
  try {
    let response: any = await fetch(apiURL + "/journal/getSentimentLabel", {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "journalEntry": journalEntry,
    }),
  });
    let responseJson = await response.json();
    if(response.ok) {
      return responseJson;
    } else if (!responseJson.message) {
      throw new Error("Something went wrong")
    } else {
      throw new Error(responseJson.message)
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function getSentimentEntities(journalEntry) {
  try {
    let response: any = await fetch(googleAPIURL + "?key=AIzaSyBt7uIyp2Lsmr37nCdce_8wVi389uJjmIc", {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        "document": {
            "type":"PLAIN_TEXT",
            "language": "EN",
            "content": journalEntry
        }
    }),
  });
    let responseJson = await response.json();
    if(response.ok) {
      return responseJson;
    } else if (!responseJson.message) {
      throw new Error("Something went wrong")
    } else {
      throw new Error(responseJson.message)
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function reweight(journalEntry, ratedScore) {
  try {
    let response: any = await fetch(apiURL + "/journal/reWeightAndGetSentimentLabel", {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "journalEntry": journalEntry,
      "ratedScore": ratedScore
    }),
  });
    let responseJson = await response.json();
    if(response.ok) {
      return responseJson;
    } else if (!responseJson.message) {
      throw new Error("Something went wrong")
    } else {
      throw new Error(responseJson.message)
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function sendSMS() {
  try {
    let response: any = await fetch(apiURL + "/journal/sendSMS", {
    method: 'GET',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  });
    let responseJson = await response.json();
    if(response.ok) {
      return responseJson;
    } else if (!responseJson.message) {
      throw new Error("Something went wrong")
    } else {
      throw new Error(responseJson.message)
    }
  } catch (error) {
    throw new Error(error.message);
  }
}

export async function submitSentimentLabel(journalEntry) {
  try {
    let response: any = await fetch(apiURL + "/journal/submitSentimentLabel", {
    method: 'POST',
    mode: 'cors',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      "journalEntry": journalEntry,
    }),
  });
    let responseJson = await response.json();
    if(response.ok) {
      return responseJson;
    } else if (!responseJson.message) {
      throw new Error("Something went wrong")
    } else {
      throw new Error(responseJson.message)
    }
  } catch (error) {
    throw new Error(error.message);
  }
}