const SlackBot = require('slackbots');
const axios = require('axios');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config()

const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'slackjokeclassic'
})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text, data.channel);
})

function handleMessage(message, channel) {
    if(message.toLowerCase().includes('inspire me')) {
        inspireMe(channel)
    } else if(message.toLowerCase().includes('joke please')) {
        randomJoke(channel)
    }
}

function randomJoke(channel) {
    axios
        .get('https://us-central1-dadsofunny.cloudfunctions.net/DadJokes/random/jokes', {
            headers: { Accept: 'application/json' }})
        .then(res => {
            const question = res.data.setup;
            const answer = res.data.punchline;

            const params = {
                icon_emoji: ':laughing:'
            }

            bot.postMessage(
                channel,
                `${question}\n\n${answer} :joy:`,
                {icon_emoji: ':laughing:'}
            );
        });
}

function inspireMe(channel) {
    axios.get('https://raw.githubusercontent.com/BolajiAyodeji/inspireNuggets/master/src/quotes.json')
      .then(res => {
            const quotes = res.data;
            const random = Math.floor(Math.random() * quotes.length);
            const quote = quotes[random].quote
            const author = quotes[random].author

            const params = {
                icon_emoji: ':male-technologist:'
            }

            bot.postMessage(
                channel,
                `:zap: ${quote} - *${author}*`,
                params
            );

      })
}
