'use strict';
const Alexa = require('alexa-sdk');


const APP_ID = undefined;

const SKILL_NAME = 'Beat Bot';
const PLAY_PROMPT = 'Welcome to Beat Bot.';
const HELP_MESSAGE = 'Ask me to play a beat at 80 BPM, 120 BPM, or 160 BPM';
const HELP_REPROMPT = 'Ask me to play a beat at 80 BPM, 120 BPM, or 160 BPM';
const STOP_MESSAGE = '';

const data = [
    "\'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/80test.mp3\'",
    "\'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/120test.mp3\'",
    "\'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/160test.mp3\'"
];


const handlers = {
    'LaunchRequest': function () {
        this.response.speak(PLAY_PROMPT)
        this.emit(':responseReady');
    },
    'PlayIntent': function () { //test function
        this.response.speak(PLAY_PROMPT).listen(HELP_REPROMPT)
        this.emit(':responseReady');

    },
    'startbeat': function () {
        const BPM = this.event.request.intent.slots.BPM.value;
        //if BPM not specified
            // (ask if they want to specify a BPM - or slow/med/fast)
        //check if BPM in range 
        //"I don't have that one, this one is closest, want to play that one"
            //yes - continue
            //no - reprompt with what is available
        if(BPM == 80 || BPM == "80 bpm"){
            var speechOutput = "<audio src=" + data[0] + " />"
        }
        else if(BPM == 120 || BPM == "120 bpm"){
            var speechOutput = "<audio src=" + data[1] + " />"
        }
        else if(BPM == 160 || BPM == "160 bpm"){
            var speechOutput = "<audio src=" + data[2] + " />"
        }
        else{
            var speechOutput = "<audio src=" + data[1] + " />"
        }
        
        
        this.response.speak(speechOutput).listen('continue?')
        this.emit(':responseReady');
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
        this.response.speak(STOP_MESSAGE).listen("Want to play another beat?");
        this.emit(':responseReady');
    },
    'AMAZON.PauseIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
     'AMAZON.LoopOffIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
     'AMAZON.LoopOnIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
     'AMAZON.NextIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
     'AMAZON.PreviousIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
     'AMAZON.RepeatIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
     'AMAZON.ShuffleOffIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
     'AMAZON.ShuffleOnIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
     'AMAZON.StartOverIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
};


exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers);
    alexa.execute();
};
