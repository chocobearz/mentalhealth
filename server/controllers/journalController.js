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


exports.submitSentimentLabel = (req, res) => {

    let weights;
    let intercepts;
    let longTermScore;

    const client = new Client({
    user: 'cguklksqtupwns',
    host: 'ec2-34-225-162-157.compute-1.amazonaws.com',
    database: 'dfqtq6134kl633',
    password: '39280be31f90ed9bcbc90f1a994cf5244530605c37be84dd7a6c250d3fdc38cd',
    port: 5432,
});
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
                .then(ratings                                           => {
                    const values = [ratings.longTermScore, ratings.currentRating]
                    client
                    .query(query2Text, values)
                    .then(dbResponse => {
                        console.log(dbResponse)
                        client.end()
                        return res.status(200).send({
                            label: ratings.currentRating,
                            longtermScore: ratings.longTermScore
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

    const client = new Client({
        user: 'cguklksqtupwns',
        host: 'ec2-34-225-162-157.compute-1.amazonaws.com',
        database: 'dfqtq6134kl633',
        password: '39280be31f90ed9bcbc90f1a994cf5244530605c37be84dd7a6c250d3fdc38cd',
        port: 5432,
    });
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
                client.end()
                return res.status(200).send({
                    label: ratings.currentRating,
                    longtermScore: ratings.longTermScore
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


exports.reWeightAndGetSentimentLabel = (req, res) => {

    let weights;
    let intercepts;

    const client = new Client({
        user: 'cguklksqtupwns',
        host: 'ec2-34-225-162-157.compute-1.amazonaws.com',
        database: 'dfqtq6134kl633',
        password: '39280be31f90ed9bcbc90f1a994cf5244530605c37be84dd7a6c250d3fdc38cd',
        port: 5432,
    });
    client.connect()

    client
    .query(getUserquery)
    .then(dbResponse => {
        weights = dbResponse.rows[0].weights
        intercepts = dbResponse.rows[0].intercepts
                var journalEntry = req.body.journalEntry;
                var userScore = req.body.ratedScore;
                runReWeight(res, journalEntry, weights, intercepts, userScore)
                .then(results => {
                    console.log(results)
                    client.end()
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

exports.sendSMS = (req, res) => {
    const accountSid = 'ACfec2ddb2e51c57dc3ae30b810d697a47';
    const authToken = '185732583c329a9efacc104827bc3eb3';
    const client = require('twilio')(accountSid, authToken);

    client.messages
      .create({
         body: 'From inkWell: Hey, Ella is having a rough day. It might be nice to check in on them',
         from: '+17784019789',
         to: '+12506612842'
       })
      .then(message => {
        console.log(message.sid)
        res.status(200).send({
        });
        }
    );

};

const runReWeight =  async (res, journalEntry, weights, intercepts, userScore) => {
    return new Promise((resolve, reject) => {
        var {PythonShell} = require('python-shell') 
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

const runPredict =  async (res, journalEntry, weights, intercepts, longtermScore) => {
    return new Promise((resolve, reject) => {
        var {PythonShell} = require('python-shell') 
        var options = {
            mode: 'text',
            args: [longtermScore, journalEntry, weights, intercepts],
            scriptPath: '/app/appScripts/'
        };

        PythonShell.run('predict.py', options, (err, results) => {
            if (err) console.log(err);
            resolve( {
                longTermScore: results[1],
                currentRating: results[0],
            })
        });
    })

};