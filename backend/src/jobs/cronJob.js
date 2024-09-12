const cron = require('node-cron');
const { fetchQuoteOfTheDay, saveQuoteToDB, checkAndFetchTodayQuote } = require('../controllers/qotdController');

checkAndFetchTodayQuote();

cron.schedule('0 0 * * *', async () => {
    console.log('Fetching quote of the day...');
    const quoteData = await fetchQuoteOfTheDay();
    saveQuoteToDB(quoteData);
},
{
    timezone: "Asia/Seoul"  
});

module.exports = cron;