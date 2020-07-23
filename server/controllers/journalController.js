const fetch = require("node-fetch");
const url = "https://jsonplaceholder.typicode.com/posts/1";

exports.getSentimentLabel = (req, res) => {

    var journalEntry = req.body.journalEntry;
    var label = journalEntry.length % 3
    return res.status(response.statusCode).send({
        label: label
    });

};