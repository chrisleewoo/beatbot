'use strict';
const Alexa = require('alexa-sdk');


const APP_ID = undefined;

const SKILL_NAME = 'Beat Bot';
const PLAY_PROMPT = "Welcome to Beat Bot: ";
const HELP_MESSAGE = 'This is the help message';
const HELP_REPROMPT = 'What can I help you with?';
const STOP_MESSAGE = 'Goodbye!';

const data = [
    "\'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/basickit/01_kick.mp3\'"
];


const handlers = {
    'LaunchRequest': function () {
        this.emit('PLAY_PROMPT');
    },
    'PlayIntent': function () {
        this.emit('startbeat')
    
    },
    'startbeat': function () {
        var speechOutput = "<audio src=" + data[0] + " />"
        speechOutput += "<break time='100ms'/>"
        speechOutput += "<audio src=" + data[0] + " />"
        speechOutput += "<break time='100ms'/>"

        speechOutput += "<audio src=" + data[0] + " />"
        speechOutput += "<break time='100ms'/>"
        speechOutput += "<audio src=" + data[0] + " />"
        speechOutput += "<break time='100ms'/>"
        
        // ((bpm/60) * 1000) - 375
        //this.response.speak(speechOutput)
        this.emit(':tell', speechOutput);
        //this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
    'AMAZON.StopIntent': function () {
        this.response.speak(STOP_MESSAGE);
        this.emit(':responseReady');
    },
};




exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
