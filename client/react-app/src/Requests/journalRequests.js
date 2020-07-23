const apiURL = "https://mental-health-node-app.herokuapp.com/"

export async function postRegisterUser(journalEntry) {
  try {
    let response: any = await fetch(apiURL + "/journal/getSentimentScore", {
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