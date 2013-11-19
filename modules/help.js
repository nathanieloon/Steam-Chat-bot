// The help functions module for JEB
// @author Nathaniel Oon
// @date 2013

// Add commands to array
commands.push(['about'+chatBotName, showVersion]);
commands.push(['getHelp', showHelp]);
commands.push(['timerHelp', timerHelp]);

function showVersion(text) {
    return chatBot+chatBotFullName+" - v"+version+" - 2013 - Nate O";
}

// Show general help
function showHelp(text) {
    var output = "";
    output += chatBot+"Below are the valid functions for the "+chatBotFullName+", and their valid syntaxes:\n";
    output += chatBot+"flipC - Flips a Coin\n";
    output += chatBot+"rollD - Rolls a die.\n";
    output += chatBot+"rollH - Rolls between 0 and 100.\n";
    output += chatBot+"rollN [int] - Rolls between 0 and the given integer.\n";
    output += chatBot+"rollL [n1 n2 .. nN] [int] - Rolls for each player give, between 0 and the given integer.\n";
    output += chatBot+"KFsb - Returns a Killing Floor money related quote.\n";
    output += chatBot+"DOSH - DOSH.\n";
    output += chatBot+"getTime - Returns the current, local time and date.\n";
    output += chatBot+"startCount [int] - Start the countdown for the given number of seconds.\n";
    output += chatBot+"stopCount - Stop the current countdown.\n";
    output += chatBot+"getHelp - This help dialog.\n";
    output += chatBot+"timerHelp - Show help regarding timers.\n";
    output += chatBot+"about"+chatBotName+" - Version information regarding "+chatBotDisplayName+".\n";
    
    sendMessage(output);
}

// Show timer related help
function timerHelp(text) {
    var output = "";
    output += chatBot+"Below are the valid timer functions, and their valid syntaxes:\n";
    output += chatBot+"startTimer [id] - Starts a timer with the given ID (this can be an int, or an alphanumeric id).\n";
    output += chatBot+"stopTimer [id] - Stops the timer with the given ID.\n";
    output += chatBot+"checkTimer [id] - Check if the timer with the given ID is active.\n";
    output += chatBot+"listTimers - List the active timers.\n";
    output += chatBot+"stopTimers - Stop all of the active timers.\n";
    output += chatBot+"timerHelp - This help dialog.\n";
    
    sendMessage(output);
}