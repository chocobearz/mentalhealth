

exports.getSentimentLabel = (req, res) => {

    const { Client } = require('pg');

    const client = new Client({
        user: 'cguklksqtupwns',
        host: 'ec2-34-225-162-157.compute-1.amazonaws.com',
        database: 'dfqtq6134kl633',
        password: '39280be31f90ed9bcbc90f1a994cf5244530605c37be84dd7a6c250d3fdc38cd',
        port: 5432,
    });

    let weights;
    let intercepts;

    client.connect();

    const query = `
        SELECT *
        FROM users
        WHERE user_id = 1
        `;

    const query2Text = `
        INSERT INTO scores
        (user_id, longterm_score, current_score)
        VALUES (1, $1, $2);
        `;

    client
    .query(query)
    .then(dbResponse => {
        weights = dbResponse[0].weights
        intercepts = dbResponse[0].intercepts
        var journalEntry = req.body.journalEntry;
        const ratings =  runPredict(res, journalEntry, weights, intercepts);
        const values = [ratings.longTermScore, ratings.currentRating]
        client
        .query(query2Text, values)
        .then(dbResponse => {
            return res.status(200).send({
                label: ratings.currentRating
            });
        });
    })
    .catch(err => {
        console.error(err);
    })

};


const runPredict =  (res, journalEntry, weights, intercepts) => {
    var {PythonShell} = require('python-shell') 
    var longTermScore = 0;
    //var journalEntry = "Text sample"
    //var intercepts = "[-1.52631775, 0.20101568, 1.32530206]";
    //var weights = "[[-0.02807738, 0.0393423, -0.85414827, 0.00677817],[-0.02909687, 0.03356314, -0.74487031, 0.00826826],[0.05717426, -0.07290543, 1.59901859, -0.01504643]]";
    var options = {
        mode: 'text',
        args: [longTermScore, journalEntry, weights, intercepts],
        scriptPath: '/app/appScripts/'
    };

    PythonShell.run('predict.py', options, (err, results) => {
        if (err) console.log(err);
        return {
            currentRating: results[0],
            longTermScore: results[1]
        }
    });
};