const fetch = require("node-fetch");
const url = "https://jsonplaceholder.typicode.com/posts/1";

exports.getSentimentLabel = (req, res) => {

    var journalEntry = req.body.journalEntry;
    console.log("jounralEntry : " + journalEntry)
    var label = journalEntry.length % 3
    console.log("label : " + label)
    return res.status(response.statusCode).send({
        label: label
    });

};