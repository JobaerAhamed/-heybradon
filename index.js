
var express = require('express');
const SlackBot = require('slackbots');
const axios = require('axios');

// App setup
var app = express();
var server = app.listen(process.env.PORT || 3000, function() {
    console.log("Server is listening....");
});

app.use(express.static('public'))

/*
app.get('/', function (req, res) {
    res.send('Hello World!')
    res.sendFile('./public/index.html')
  })

*/

const bot = new SlackBot({
    token: 'xoxo_KEY_GOES_HERE',
    name: 'HeyBradon'
});

/*
bot.on('start', () => {
    const params = {
        icon_emoji: ':sunglasses:'
    }

    bot.postMessageToChannel(
        'botchannel', 'Here we go posting jokes...', params);
});
*/

//if any error
bot.on('error', (err) => console.log(err));

//message hanling
bot.on('message', data => {
    if(data.type !== 'message'){
        return;
    }
    //console.log (data);
    console.log ("  ");
    console.log (data);
    handleMessage(data.text);
});

//reply to message
function handleMessage(message){
    if(message.includes(' chucknorris')){
        chuckJoke();
    }
    else if (message.includes(' yomama')){
        yomama();
    }
    else if(message.includes(' doggo')){
        doggo();
    }
}

//tell chuck joke
function chuckJoke(){
    axios.get('http://api.icndb.com/jokes/random')
    .then (res => {
        const joke = res.data.value.joke;
        const params = {
            icon_emoji: ':laughing:'
        }
    
        bot.postMessageToChannel('botchannel',`Did you know? : ${joke}`,
            params
        );
    })
}

//Yomama
function yomama(){
    axios.get('http://api.yomomma.info')
    .then (res => {
        const joke = res.data.joke;
        console.log(joke);
        const params = {
            icon_emoji: ':joy:'
        }
    
        bot.postMessageToChannel('botchannel',`Fact : ${joke}`, params);
    })
}

//doggo
function doggo(){
    //axios.get('https://dog.ceo/api/breeds/image/random')
    axios.get('https://random.dog/woof.json')
    .then (res => {
        const apidata = res.data.url;
        console.log(apidata);
        const params = {
            icon_emoji: ':dog:',
            apidata        
        }
    
        bot.postMessageToChannel('botchannel',`DOGGO : ${apidata}`, params);
    })

}
