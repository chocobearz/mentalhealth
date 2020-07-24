var path = require('path');

exports.getSentimentLabel = (req, res) => {

    // var journalEntry = req.body.journalEntry;
    // console.log("jounralEntry : " + journalEntry)
    // var label = journalEntry.length % 3
    // console.log("label : " + label)

    // var spawn = require('child_process').spawn;
    // var py = spawn('python', ['../appScripts/predict.py',longTermScore,journalEntry,weights,intercepts]);
    // var dataString = '';
    // py.stdout.on('data', function(data) { 

    //     console.log(data.toString()); 
    //     dataString += data
    //     return res.status(200).send({
    //     label: dataString
    // });

    console.log("about to call runPy")
    runPy(res)

};


const runPy = async (res) => {
        var {PythonShell} = require('python-shell') 
    var longTermScore = 0;
    var journalEntry = "Text sample"
    var intercepts = "[-1.52631775, 0.20101568, 1.32530206]";
    var weights = "[[-0.02807738, 0.0393423, -0.85414827, 0.00677817],[-0.02909687, 0.03356314, -0.74487031, 0.00826826],[0.05717426, -0.07290543, 1.59901859, -0.01504643]]";
        var options = {
        mode: 'text',
        args: [longTermScore, journalEntry, weights, intercepts],
        scriptPath: path.join(__dirname, 'appScripts/')
        };

        const result = await new Promise((resolve, reject) => {
            PythonShell.run('predict.py', options, (err, results) => {
            if (err) return reject(err);
            return resolve(results);
            });
        });
        console.log(result.stdout);
        return res.status(200).send({
            label: results
        });
    };