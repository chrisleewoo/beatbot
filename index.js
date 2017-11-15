'use strict';
const Alexa = require('alexa-sdk');


const APP_ID = undefined;

const SKILL_NAME = 'Beat Bot';
const PLAY_PROMPT = 'Welcome to Beat Bot. Ask me to drop a beat! Say help for more instructions.';
const HELP_MESSAGE = 'I currently can play a beat based on speed and genre. For example you can say play a rock song, play a beat at 80 bpm, or play a rock song at 80 bpm. Say Alexa stop or Alexa cancel to end the beat or ask Alexa to play a new beat.' ;
const HELP_REPROMPT = 'Say drop a beat!';
const STOP_MESSAGE = 'Okay bye';

const data = [
    'https://s3.amazonaws.com/drumpatterns/80test.mp3',
    'https://s3.amazonaws.com/drumpatterns/120test.mp3',
    'https://s3.amazonaws.com/drumpatterns/160test.mp3',
    'https://s3.amazonaws.com/drumpatterns/Rock80Kit.mp3',
    'https://s3.amazonaws.com/drumpatterns/Rock120Kit.mp3',
    'https://s3.amazonaws.com/drumpatterns/Rock160Kit.mp3',
    'https://s3.amazonaws.com/drumpatterns/Rock80Elec.mp3',
    'https://s3.amazonaws.com/drumpatterns/Rock120Elec.mp3',
    'https://s3.amazonaws.com/drumpatterns/Rock160Elec.mp3',
    'https://s3.amazonaws.com/drumpatterns/80Coolcat.mp3',
    'https://s3.amazonaws.com/drumpatterns/120Coolcat.mp3'
];

const sillydata = [
    
]; 

const handlers = {
    'LaunchRequest': function () {
        this.response.speak(PLAY_PROMPT).listen(HELP_MESSAGE);
        this.emit(':responseReady');
    },
    'GenreIntent': function () { //test function
        this.response.speak("You can choose from Rock, Electronic, Relaxing, or Workout").listen("What do you want to play?");
        this.emit(':responseReady');

    },
    'SpeedIntent': function () { //test function
        this.response.speak("You can choose between 80, 120, or 160 BPM").listen("What do you want to play?");
        this.emit(':responseReady');

    },
    'PlayIntent': function () {
        //TO DO: pick genre - and then list specifications of genre 
        const BPM = this.event.request.intent.slots.NUM.value;
        const G = this.event.request.intent.slots.style.value;
        var speechOutput = "playing beat"
        var audioFile = "nothing"
        
        if(G == "rock"){
            if(BPM == 80){
                var audioFile = data[3]
                var speechOutput = "playing a rock beat at 80 b p m"
            }
            else if(BPM == 120){
                var audioFile = data[4]
                var speechOutput = "playing a rock beat at 120 b p m"
            }
            else if(BPM == 160){
                var audioFile = data[5]
                var speechOutput = "playing a rock beat at 160 b p m"
            }
            else{
                var speechOutput = "playing a rock beat"
                var audioFile = data[Math.round(Math.random() * 5) + 3];
            }
        
        }
        else if(G == "electronic"){
            if(BPM == 80){
                var audioFile = data[6]
                var speechOutput = "playing an  beat at 80 b p m"
            }
            else if(BPM == 120){
                var audioFile = data[7]
                var speechOutput = "playing an electronic beat at 120 b p m"
            }
            else if(BPM == 160){
                var audioFile = data[8]
                var speechOutput = "playing an electric beat at 160 b p m"
            }
            else{
                var speechOutput = "playing an electronic beat"
                var audioFile = data[Math.round(Math.random() * 8) + 6];
            }
        }
        else if(G == 'relaxing'){
            if(BPM == 80){
                var audioFile = data[9]
                var speechOutput = "playing a relaxing beat at 80 b p m"
            }
            else if(BPM == 120){
                var audioFile = data[10]
                var speechOutput = "playing a relaxing beat at 120 b p m"
            }
            else{
                var speechOutput = "playing a relaxing beat"
                var audioFile = data[Math.round(Math.random() * 10) + 9];
            }
        }
        else if(G == 'workout'){
            if(BPM == 80){
                var audioFile = data[0]
                var speechOutput = "playing a workout beat at 80 b p m"
            }
            else if(BPM == 120){
                var audioFile = data[1]
                var speechOutput = "playing a workout beat at 120 b p m"
            }
            else if(BPM == 160){
                var audioFile = data[2]
                var speechOutput = "playing a workout beat at 160 b p m"
            }
            else{
                var speechOutput = "playing a workout beat"
                var audioFile = data[Math.round(Math.random() * 2)];
            }
        }
        else if(BPM == 80){
            var audioFile = data[0]
            var speechOutput = "playing a beat at 80 b p m"
        }
        else if(BPM == 120){
            var audioFile = data[1]
            var speechOutput = "playing a beat at 120 b p m"
        }
        else if(BPM == 160){
            var audioFile = data[2]
            var speechOutput = "playing a beat at 160 b p m"
        }
        else if(BPM > 0){
            var speechOutput = "Sorry, we currently only support 80, 120, and 160 B P M"
        }
        else{
            var speechOutput = "What type of beat do you want? You can specify genre and speed or ask for a random beat"
        }
        //this.response.speak("test");
        if(audioFile != "nothing"){
            controller.play.call(this,audioFile,speechOutput);
            //this.response.speak(speechOutput).audioPlayerPlay('REPLACE_ALL', audioFile, audioFile, null, 0).listen("");
        }
        else{
            this.response.speak(speechOutput).listen("What type of beat do you want?");
            this.emit(':responseReady');
            
        }
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
        controller.stop.call(this);
    },
    'AMAZON.PauseIntent': function () {
        this.response.speak("You can't pause");
        this.emit(':responseReady');
    },
    'AMAZON.ResumeIntent': function () {
        this.response.speak("You can't resume");
        this.emit(':responseReady');
    },
     'AMAZON.LoopOffIntent': function () {
        controller.stop.call(this);
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
        controller.play.call(this,audioFile,"Playing a random beat");
    },
     'AMAZON.ShuffleOffIntent': function () {
        controller.stop.call(this);
    },
     'AMAZON.StartOverIntent': function () {
        this.response.speak("Not yet handled");
        this.emit(':responseReady');
    },
    'Unhandled':function(){
        this.response.speak("What? I don't understand");
        this.emit(':responseReady');
    }
    'AMAZON.YesIntent:' function(){
        this.response.speak("Okay, what beat do you want to play now?").listen("Tell me a beat to play!");
        this.emit(':responseReady');
    }
    'AMAZON.NoIntent': function(){
        this.response.speak("Okay, bye");
        this.emit(':responseReady');
    }
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

        //this.response.audioPlayer('play','REPLACE_ALL', data[2], data[2], null, 0);
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

var controller = function(){
    return{
        play: function(audioFile,speechOutput){
        
        this.response.speak(speechOutput).audioPlayer('play','REPLACE_ALL', audioFile, audioFile, null, 0);
        this.emit(':responseReady');
        },
        stop: function(){
            this.response.speak("Stopping. Do you want to play another beat?").audioPlayerStop();
            this.emit(':responseReady');
        }
    }
}();

exports.handler = function (event, context, callback) {
    const alexa = Alexa.handler(event, context, callback);
    alexa.APP_ID = APP_ID;
    alexa.registerHandlers(handlers, audioEventHandlers);
    var audioPlayerInterface = ((((event.context || {}).System || {}).device || {}).supportedInterfaces || {}).AudioPlayer;
    //if (audioPlayerInterface === undefined) {
        //alexa.emit(':tell', 'Sorry, this skill is not supported on this device');
    //}
    //else{
    alexa.execute();
    //}
};
