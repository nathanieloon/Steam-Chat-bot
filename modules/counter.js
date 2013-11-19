// The countdown module for JEB
// @author Nathaniel Oon
// @date 2013

// Add commands to array
commands.push(['startC', startCount]);
commands.push(['stopC', startCount]);

// Countdown variables
var count, counter, countValid = false;

// Start a countdown
function startCount(text) {
    var time = text[1];

    if (countValid) {
        sendMessage(chatBot+"There is already a countdown going, you cannot start another");
        return;
    }
    countValid = true;
    count = time;
    
    sendMessage(chatBot+"Countdown from _"+time+"s_ has begun.");

    counter = setInterval(countDown, 1000);
}

// The countdown
function countDown() {  
    if (countValid == false) {
        clearInterval(counter);
        sendMessage(chatBot+"Countdown aborted");
        return;
    }
    console.log(counter);
    sendMessage(chatBot+""+count);
    if (count <= 0) {
        clearInterval(counter);
        sendMessage(chatBot+"Countdown complete.");
        return;
    }
    count = count-1;
}

// Abort the countdown
function stopCount(text) {
    countValid = false;
}