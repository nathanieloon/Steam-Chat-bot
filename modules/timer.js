// The timer module for JEB
// @author Nathaniel Oon
// @date 2013

// Function to start the timer
var timers = new Array(), startTimes = new Array();
function startTimer(num) {
    if (typeof num === 'undefined') {
        return chatBot+"A valid timer ID must be specified.";
    } else if (timers.indexOf(num) != -1) {
        sendMessage(chatBot+"This timer is already active.");
        return;
    }
    timers.push(num);
    var timer = new Date();
    startTimes.push(timer.getTime());
    return (chatBot+"Timer _"+num+"_ has begun");
}

// Function to stop the timer
function stopTimer(num) {
    if (typeof num === 'undefined') {
        return chatBot+"A valid timer ID must be specified.";
    } else if (timers.indexOf(num) == -1) {
        return chatBot+"Timer _"+num+"_ is not active, so cannot be stopped.";
    }
        
    var timer = new Date();
    var endTime = timer.getTime();
    finalTime = endTime-startTimes.splice(timers.indexOf(num), 1);
    return chatBot+"Timer _"+timers.splice(timers.indexOf(num), 1)+"_ finished at: "+formatTimer(finalTime)+".";   
}

// Function to get timer status
function checkTimer(num) {
    if (timers.indexOf(num) != -1) {
        var timer = new Date();
        var time = timer.getTime();
        currTime = time-startTimes[timers.indexOf(num)];  
        return chatBot+"Timer _"+num+"_ is currently running, and is at "+formatTimer(currTime)+".";
    } else {
        return chatBot+"Timer _"+num+"_ is not active.";
    }
}

// Function to get all timer statuses
function checkAllTimers() {
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
    
    return output;
}

// Function to get all timer statuses
function stopAllTimers() {
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
    
    return output;
}

// Format time
function formatTimer(time) {
    var hours = parseInt((time / (1000*60*60)) % 24)+"hrs";
    var min = parseInt((time / (1000*60)) % 60)+"min";
    var secs = (time/1000%60)+"s";
    if (time > 3600000) {
        return hrs+", "+min+" and "+secs;
    } else if (time > 60000) { 
        return min+" and "+secs;
    } else {
        return secs;
    }
}