// The timer module for JEB
// @author Nathaniel Oon
// @date 2013

// Add commands to array
commands.push(['startT', startTimer]);
commands.push(['stopT', stopTimer]);
commands.push(['checkT', checkTimer]);
commands.push(['listT', checkAllTimers]);
commands.push(['stopTs', stopAllTimers]);

// Function to start the timer
var timers = new Array(), startTimes = new Array();

function startTimer(text) {
    var id = text[1];

    if (typeof num === 'undefined') {
        return chatBot+"A valid timer ID must be specified.";
    } else if (timers.indexOf(id) != -1) {
        sendMessage(chatBot+"This timer is already active.");
        return;
    }
    timers.push(id);
    var timer = new Date();
    startTimes.push(timer.getTime());
    var output = chatBot+"Timer _"+id+"_ has begun";
    
    sendMessage(output);
}

// Function to stop the timer
function stopTimer(text) {
    var id = text[1];

    if (typeof id === 'undefined') {
        return chatBot+"A valid timer ID must be specified.";
    } else if (timers.indexOf(id) == -1) {
        return chatBot+"Timer _"+id+"_ is not active, so cannot be stopped.";
    }
        
    var timer = new Date();
    var endTime = timer.getTime();
    finalTime = endTime-startTimes.splice(timers.indexOf(id), 1);
    var output = chatBot+"Timer _"+timers.splice(timers.indexOf(id), 1)+"_ finished at: "+formatTimer(finalTime)+".";   

    sendMessage(output);
}

// Function to get timer status
function checkTimer(text) {
    var id = text[1];
    var output;
    if (timers.indexOf(id) != -1) {
        var timer = new Date();
        var time = timer.getTime();
        currTime = time-startTimes[timers.indexOf(id)];  
        output = chatBot+"Timer _"+id+"_ is currently running, and is at "+formatTimer(currTime)+".";
    } else {
        output = chatBot+"Timer _"+id+"_ is not active.";
    }

    sendMessage(output);
}

// Function to get all timer statuses
function checkAllTimers(text) {
    var output = "", numTimers = timers.length;
    if (numTimers > 0) {
        output += chatBot+"The following timers are currently active:\n";
        
        for (var i=0; i<numTimers; i++) {
            var timer = new Date();
            var time = timer.getTime();
            currTime = time-startTimes[i];
            output += chatBot+"Timer _"+timers[i]+"_ is currently at "+formatTimer(currTime)+".\n";
        }
    } else {
        output += chatBot+"There are no timers currently active.";
    }
    
    sendMessage(output);
}

// Function to get all timer statuses
function stopAllTimers(text) {
    var output = "", numTimers = timers.length;
    if (numTimers > 0) {
        output += chatBot+"Stopping the following active timers:\n";
        
        for (var i=0; i<numTimers; i++) {
            var timer = new Date();
            var time = timer.getTime();
            currTime = time-startTimes[i];
            output += chatBot+"Timer _"+timers[i]+"_ finished at "+formatTimer(currTime)+".\n";
        }
        timers.length = 0;
        startTimes.length = 0;
        output += chatBot+"All timers have been stopped.";
    } else {
        output += chatBot+"There are no timers currently active.";
    }
    
    sendMessage(output);
}

// Format time
function formatTimer(time) {
    var hours = parseInt((time / (1000*60*60)) % 24)+"hrs";
    var min = parseInt((time / (1000*60)) % 60)+"min";
    var secs = (time/1000%60)+"s";
    var output;

    if (time > 3600000) {
        output = hrs+", "+min+" and "+secs;
    } else if (time > 60000) { 
        output = min+" and "+secs;
    } else {
        output = secs;
    }

    sendMessage(output);
}