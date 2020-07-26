const getUserquery = `
        SELECT *
        FROM users
        WHERE user_id = 1
        `;

const getLongtermScoreQuery = `
        SELECT *
        FROM scores
        WHERE user_id = 1
        ORDER BY created_at DESC
        LIMIT 1
        `;
const { Client } = require('pg');

const client = new Client({
    user: 'cguklksqtupwns',
    host: 'ec2-34-225-162-157.compute-1.amazonaws.com',
    database: 'dfqtq6134kl633',
    password: '39280be31f90ed9bcbc90f1a994cf5244530605c37be84dd7a6c250d3fdc38cd',
    port: 5432,
});

exports.submitSentimentLabel = (req, res) => {

    let weights;
    let intercepts;
    let longTermScore;

    client.connect();

    const query2Text = `
        INSERT INTO scores
        (user_id, longterm_score, current_score)
        VALUES (1, $1, $2);
        `;

    client
    .query(getUserquery)
    .then(dbResponse => {
        weights = dbResponse.rows[0].weights
        intercepts = dbResponse.rows[0].intercepts
        client.query(getLongtermScoreQuery)
            .then(dbResponse => {
                longTermScore = dbResponse.rows[0].longterm_score
                var journalEntry = req.body.journalEntry;
                runPredict(res, journalEntry, weights, intercepts, longTermScore)
                .then(ratings => {
                    const values = [ratings.longTermScore, ratings.currentRating]
                    client
                    .query(query2Text, values)
                    .then(dbResponse => {
                        console.log(dbResponse)
                        return res.status(200).send({
                            label: ratings.currentRating
                        });
                    })
                    .catch(err => {
                        console.error(err);
                    })
                })
                .catch(err => {
                    console.error(err);
                })
        })
        .catch(err => {
            console.error(err);
        })
    })
    .catch(err => {
        console.error(err);
    })

};

exports.getSentimentLabel = (req, res) => {

    let weights;
    let intercepts;

    client.connect();


    client
    .query(getUserquery)
    .then(dbResponse => {
        weights = dbResponse.rows[0].weights
        intercepts = dbResponse.rows[0].intercepts
        client.query(getLongtermScoreQuery)
            .then(dbResponse => {
                longTermScore = dbResponse.rows[0].longterm_score
                var journalEntry = req.body.journalEntry;
                runPredict(res, journalEntry, weights, intercepts, longTermScore)
                .then(ratings => {
                const values = [ratings.longTermScore, ratings.currentRating]
                return res.status(200).send({
                    label: ratings.currentRating
                });
            })
            .catch(err => {
                console.error(err);
            })
        })
        .catch(err => {
            console.error(err);
        })
    })
    .catch(err => {
        console.error(err);
    })

};


const runReWeight =  async (res, journalEntry, weights, intercepts, userScore) => {
    return new Promise((resolve, reject) => {
        var {PythonShell} = require('python-shell') 
        //var journalEntry = "Text sample"
        //var intercepts = "[-1.52631775, 0.20101568, 1.32530206]";
        //var weights = "[[-0.02807738, 0.0393423, -0.85414827, 0.00677817],[-0.02909687, 0.03356314, -0.74487031, 0.00826826],[0.05717426, -0.07290543, 1.59901859, -0.01504643]]";
        var options = {
            mode: 'text',
            args: [userScore, journalEntry, weights, intercepts],
            scriptPath: '/app/appScripts/'
        };

        PythonShell.run('reWeight.py', options, (err, results) => {
            if (err) console.log(err);
            resolve( {
                journalScore: results[0],
                currentScore: results[1],
                weights: results[2]
            })
        });
    })

};

exports.reWeightAndGetSentimentLabel = (req, res) => {

    let weights;
    let intercepts;

    client.connect();


    client
    .query(getUserquery)
    .then(dbResponse => {
        weights = dbResponse.rows[0].weights
        intercepts = dbResponse.rows[0].intercepts
                var journalEntry = req.body.journalEntry;
                var journalEntry = req.body.userScore;
                runReWeight(res, journalEntry, weights, intercepts, userScore)
                .then(results => {
                return res.status(200).send({
                    currentScore: results.currentScore,
                    journalScore: results.journalScore,
                    weights: results.weights
                });
            })
            .catch(err => {
                console.error(err);
            })
    })
    .catch(err => {
        console.error(err);
    })

};