const fetch = require("node-fetch");
const url = "https://jsonplaceholder.typicode.com/posts/1";

exports.getSentimentLabel = (req, res) => {

    // var journalEntry = req.body.journalEntry;
    // console.log("jounralEntry : " + journalEntry)
    // var label = journalEntry.length % 3
    // console.log("label : " + label)

    var longTermScore = 0;
    var journalEntry = "Text sample"
    var intercepts = "[-1.52631775, 0.20101568, 1.32530206]";
    var weights = "[[-0.02807738, 0.0393423, -0.85414827, 0.00677817],[-0.02909687, 0.03356314, -0.74487031, 0.00826826],[0.05717426, -0.07290543, 1.59901859, -0.01504643]]";

    var spawn = require('child_process').spawn;
    var py = spawn('python', ['../../appScripts/predict.py', longTermScore, journalEntry, weights, intercepts]);
    var dataString = '';

    process.stdout.on('data', function(data) { 
        console.log(data.toString()); 
        dataString += data
    } ) 

    return res.status(200).send({
        label: dataString
    });

};