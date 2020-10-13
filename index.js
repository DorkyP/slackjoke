const SlackBot = require('slackbots');
const axios = require('axios');
const fetch = require('node-fetch');
const dotenv = require('dotenv');
dotenv.config()


const bot = new SlackBot({
    token: `${process.env.BOT_TOKEN}`,
    name: 'slackjokeclassic'
})

bot.on('start', () => {
    const params = {
        icon_emoji: ':laughing:'
    }

    bot.postMessageToChannel(
        'asdf',
        "I'm here!",
        params
    );
})

bot.on('error', (err) => {
    console.log(err);
})

// Message Handler
bot.on('message', (data) => {
    if(data.type !== 'message') {
        return;
    }
    handleMessage(data.text, data.channel);
})

function handleMessage(message, channel) {
    if(message.includes('inspire')) {
        inspireMe(channel)
    } else if(message.includes('joke')) {
        randomJoke(channel)
    } else if(message.includes(' help')) {
        runHelp()
    }
}

function randomJoke(channel) {
    console.log("got here")
    fetch("jokes.json")
        .then(res => {
            const jokes = res.data;
            const random = Math.floor(Math.random() * jokes.length);
            const question = jokes[random].question
            const answer = jokes[random].answer

            const params = {
                icon_emoji: ':laughing:'
            }

            bot.postMessage(
                channel,
                `:question: ${question}`,
                params
            );

            bot.postMessage(
                channel,
                `${answer} :joy:`,
                params
            );

        })
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
