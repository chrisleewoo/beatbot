'use strict';
const Alexa = require('alexa-sdk');


const APP_ID = undefined;

const SKILL_NAME = 'Beat Bot';
const PLAY_PROMPT = 'Welcome to Beat Bot. Ask me to drop a beat! Say help for more instructions.';
const HELP_MESSAGE = 'I currently can play a beat based on speed and genre. For example you can say play a rock song or play a beat at 80 bpm.';
const HELP_REPROMPT = 'Say drop a beat!';
const STOP_MESSAGE = 'Okay bye';

const data = [
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/80test.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/120test.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/160test.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/Rock80Kit.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/Rock120Kit.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/Rock160Kit.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/Rock80Elec.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/Rock120Elec.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/Rock160Elec.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/80Coolcat.mp3',
    'https://raw.githubusercontent.com/chrisleewoo/beatbot/master/120Coolcat.mp3'
];


const handlers = {
    'LaunchRequest': function () {
        this.response.speak(PLAY_PROMPT).listen("HELP_MESSAGE");
        this.emit(':responseReady');
    },
    'GenreIntent': function () { //test function
        this.response.speak("You can choose Rock, Hip-Hop, Relaxing, or Workout").listen("");
        this.emit(':responseReady');

    },
    'SpeedIntent': function () { //test function
        this.response.speak("You can choose 80, 120, or 160 BPM").listen("");
        this.emit(':responseReady');

    },
    'PlayIntent': function () {
        //TO DO: pick genre - and then list specifications of genre 
        const BPM = this.event.request.intent.slots.NUM.value;
        const G = this.event.request.intent.slots.style.value;
        var speechOutput = "playing beat"
        if(G == "rock"){
            if(BPM == 80){
                var audioFile = data[3]
            }
            else if(BPM == 120){
                var audioFile = data[4]
            }
            else if(BPM == 160){
                var audioFile = data[5]
            }
        }
        else if(G == 'hip hop'){
            if(BPM == 80){
                var audioFile = data[6]
            }
            else if(BPM == 120){
                var audioFile = data[7]
            }
            else if(BPM == 160){
                var audioFile = data[8]
            }
        }
        else if(G == 'relaxing'){
            if(BPM == 80){
                var audioFile = data[9]
            }
            else if(BPM == 120){
                var audioFile = data[10]
            }
        }
        else if(G == 'workout'){
            if(BPM == 80){
                var audioFile = data[0]
            }
            else if(BPM == 120){
                var audioFile = data[1]
            }
            else if(BPM == 160){
               var audioFile = data[2]
            }
        }
        else if(BPM == 80){
            var audioFile = data[0]
        }
        else if(BPM == 120){
            var audioFile = data[1]
        }
        else if(BPM == 160){
            var audioFile = data[2]
        }
        else if(BPM > 0){
            var speechOutput = "We currently only support 80, 120, and 160 BPM"
        }
        else{
            var speechOutput = "What type of beat do you want? You can specify genre and speed or ask for a random beat"
        }
        //this.response.speak("test");
        this.response.speak(speechOutput).audioPlayerPlay('REPLACE_ALL', audioFile, audioFile, null, 0).listen("");
        this.emit(':responseReady');
    },
    'AMAZON.HelpIntent': function () {
        const speechOutput = HELP_MESSAGE;
        const reprompt = HELP_REPROMPT;

        this.response.speak(speechOutput).listen(reprompt);
        this.emit(':responseReady');
    },
    'AMAZON.CancelIntent': function () {
        this.emit('AMAZON.StopIntent');
    },
    'AMAZON.StopIntent': function () {
        this.response.audioPlayerStop();
        this.emit(':responseReady');
    },
    'AMAZON.PauseIntent': function () {
        this.response.audioPlayerStop();
        this.emit(':responseReady');
    },
    'AMAZON.ResumeIntent': function () {
        this.response.speak("You can't resume");
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
     'AMAZON.ShuffleOnIntent': function () {
        var audioFile = data[Math.round(Math.random() * 10)];
        this.response.speak("Shuffling").audioPlayerPlay('REPLACE_ALL', audioFile, audioFile, null, 0);
        this.emit(':responseReady');
    },
     'AMAZON.ShuffleOffIntent': function () {
        this.response.speak("Stopping shuffle").audioPlayerStop();
        this.emit(':responseReady');
    },
     'AMAZON.StartOverIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },

};

var audioEventHandlers =  {
    'PlaybackStarted' : function () {
        /*
         * AudioPlayer.PlaybackStarted Directive received.
         * Confirming that requested audio file began playing.
         * Do not send any specific response.
         */
        console.log("Playback started");        
        this.emit(':responseReady');
    },
    'PlaybackFinished' : function () {
        /*
         * AudioPlayer.PlaybackFinished Directive received.
         * Confirming that audio file completed playing.
         * Do not send any specific response.
         */
        console.log("Playback finished");
        this.emit(':responseReady');
    },
    'PlaybackStopped' : function () {
        /*
         * AudioPlayer.PlaybackStopped Directive received.
         * Confirming that audio file stopped playing.
         */
        console.log("Playback stopped");

        //do not return a response, as per https://developer.amazon.com/docs/custom-skills/audioplayer-interface-reference.html#playbackstopped
        this.emit(':responseReady');
    },
    'PlaybackNearlyFinished' : function () {
        /*
         * AudioPlayer.PlaybackNearlyFinished Directive received.
         * Replacing queue with the URL again.
         * This should not happen on live streams
         */
        console.log("Playback nearly finished");
        this.response.audioPlayerPlay('REPLACE_ALL', data[5], data[5], null, 0);
        this.emit(':responseReady');
    },
    'PlaybackFailed' : function () {
        /*
         * AudioPlayer.PlaybackFailed Directive received.
         * Logging the error and restarting playing.
         */
        console.log("Playback Failed : %j", this.event.request.error);
        this.response.audioPlayerClearQueue('CLEAR_ENQUEUED');
        this.emit(':responseReady');
    }
};


exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers, audioEventHandlers);
    alexa.execute();
};
