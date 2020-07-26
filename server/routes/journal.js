module.exports = (app) => {
    const journalController = require('../controllers/journalController.js');


    app.post('/journal/getSentimentLabel', journalController.getSentimentLabel);
    app.post('/journal/submitSentimentLabel', journalController.submitSentimentLabel);
    
}