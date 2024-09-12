const pool = require('../config/db');
const axios = require('axios');

const fetchQuoteOfTheDay = async () => {
    try {
        const response = await axios.get('https://zenquotes.io/api/today');
        const quoteData = response.data[0];
        return {
            quote: quoteData.q,
            author: quoteData.a,
            date: new Date().toISOString().split('T')[0]
        };
    } catch (error) {
        console.error('Error fetching quote of the day: ', error);
        throw error;
    }
};

const saveQuoteToDB = (quoteData) => {
    const qry = 'INSERT INTO quotes (quote, author, date) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE quote = ?, author = ?';
    const values = [quoteData.quote, quoteData.author, quoteData.date, quoteData.quote, quoteData.author];
    
    pool.query(qry, values, (err, result) => {
        if (err) {
            console.error('Error saving quote to database: ', err);
            return;
        }
        console.log('Quote saved to database:', result.insertId);
    });
}

const checkAndFetchTodayQuote = async (req, res) => {
    const today = new Date().toISOString().split('T')[0];

    const qry = 'SELECT * FROM quotes WHERE date = ?';
    const vals = [today];

    pool.query(qry, vals, async (err, result) => {
        if (err) {
            console.error('Error checking today\'s quote:', err);
            return;
        }
        
        if (result.length === 0) {
            console.log('No quote found for today, fetching new quote...');
            const quoteData = await fetchQuoteOfTheDay();
            saveQuoteToDB(quoteData);
        } else {
            console.log('Today\'s quote already exists:', result[0]);
        }
    });
}

module.exports = {
    fetchQuoteOfTheDay,
    saveQuoteToDB,
    checkAndFetchTodayQuote
};