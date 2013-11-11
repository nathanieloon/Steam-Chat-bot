// select the target node

$(document).ready(function() {
    if (typeof Chat === 'undefined') {
        console.log("ERROR: The chat didn't load properly - check your cookies.");
    }
});

var chatBot = "[SCB] ";
var chatBotErr = "[SCB] Error: ";
var version = 2.0;


// ACTION CHOOSER
// =======================================================================================
// Choose option for flip/roll
function chooseAction(given) {
    var text = given.split(" ");
    
    if (text.length > 1) {
        var val = text[1];
    }
    
    var action = text[0];
	
    // Temp disabled until admin commands are introduced
    /*
	if (action == "repeat") {
		var n = parseInt(text[1],10);
		var command = text[2];
        if (n > 1000) {
            var dontdick = chatBot+"Come on now, don't be a schmuck.";
            sendMessage(dontdick);
        } else {
            for(var i = 0; i < n; i++){
            chooseAction(text.slice(2).join(" ")); //send the second part of it
            }
        }
	}*/
    
    //console.log("Action: "+action);
    
    if (action == "flipC") {
        sendMessage(flipCoin());
    } else if (action == "rollD") {
        sendMessage(rollDie());
    } else if (action == "rollH") {
        sendMessage(rollHundred());
    } else if (action == "rollN") {
        sendMessage(rollNumber(val));
    } else if (action == "rollL") {
        sendMessage(rollList(text));
    } else if (action == "KFsb") {
        sendMessage(killingFloorDosh());
    } else if (action == "DOSH") {
        sendMessage(megaDosh());
    } else if (action == "getTime") {
        sendMessage(timeAndDate());
    } else if (action == "getHelp") {
        sendMessage(showHelp());
    } else if (action == "timerHelp") {
        sendMessage(timerHelp());
    } else if (action == "aboutSCB") {
        sendMessage(showVersion());
    } else if (action == "startCount") {
        startCount(val);
    } else if (action == "stopCount") {
        stopCount();
    } else if (action == "startTimer") {
        sendMessage(startTimer(val));
    } else if (action == "stopTimer") {
        sendMessage(stopTimer(val));
    } else if (action == "checkTimer") {
        sendMessage(checkTimer(val));
    } else if (action == "listTimers") {
        sendMessage(checkAllTimers());
    } else if (action == "stopTimers") {
        sendMessage(stopAllTimers());
    }
}

// HELP FUNCTIONS
// =======================================================================================
function showVersion() {
	return chatBot+"Steam Chat Bot (SCB) - v"+version+" - 2013 - Nate O";
}

// Show general help
function showHelp() {
    var output = "";
    output += chatBot+"Below are the valid functions for the Steam Chat Bot (SCB), and their valid syntaxes:\n";
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
    output += chatBot+"aboutSCB - Version information regarding the SCB.\n";
    return output;
}

// Show timer related help
function timerHelp() {
	var output = "";
    output += chatBot+"Below are the valid timer functions, and their valid syntaxes:\n";
    output += chatBot+"startTimer [id] - Starts a timer with the given ID (this can be an int, or an alphanumeric id).\n";
    output += chatBot+"stopTimer [id] - Stops the timer with the given ID.\n";
    output += chatBot+"checkTimer [id] - Check if the timer with the given ID is active.\n";
    output += chatBot+"listTimers - List the active timers.\n";
    output += chatBot+"stopTimers - Stop all of the active timers.\n";
    output += chatBot+"timerHelp - This help dialog.\n";
    return output;
}


// ACTIONS
// =======================================================================================
// Get a random number (will be a float)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Flip a coin
function flipCoin() {
    var coin = getRandom(0, 2);
    
    if (coin == 1) {
        coin = "Tails";
    } else {
        coin = "Heads";
    }
    
    console.log("Flip a coin: "+coin);
    return chatBot+":penny::penny::penny: The coin lands on _"+coin+"_! :penny::penny::penny:";
}

// Roll a die
function rollDie() {
    var die = getRandom(0, 6);
    console.log("Roll a die: "+die);
    return chatBot+":luck::luck::luck: You rolled a _"+die+"_! :luck::luck::luck:";
}

// Roll out of one hundred
function rollHundred() {
	var hund = getRandom(0, 100);
    console.log("Roll out of one hundred: "+hund);
    return chatBot+":hex::hex::hex: You rolled a _"+hund+"_! :hex::hex::hex:";
}

// Roll to a roll of your choice
function rollNumber(n) {
    // Validity check
    if (n != parseInt(n, 10)) return chatBotErr+"The second argument for _rollN_ must be a number.";
    
    // Roll the number
    var num = getRandom(0, n);
    console.log("Roll to a max of "+n+": "+num);
    return chatBot+":vaultkey::vaultkey::vaultkey: You rolled a _"+num+"_ out of _"+n+"_! :vaultkey::vaultkey::vaultkey:";
}

// Roll a list of values
function rollList(textArray) {
    // Initialise variables
    var arrayLen = textArray.length;
    var max = textArray[arrayLen-1];
    var output = chatBot;
    
    // Validity checks
    if (arrayLen < 3) {
        return chatBotErr+"You must have at least 3 arguments for a _rollL_ action.";
    } else if (max != parseInt(max, 10)) {
        return chatBotErr+"The last argument for _rollL_ must be an integer.";
    } else if (max < 0) {
        return chatBotErr+"The max roll integer must be greater than 0.";
    }
    
    // Set highest value and name
    var h_val = -1;
    var h_name = "";
    
    for (var i=1; i<arrayLen-1; i++) {
        var roll = getRandom (0, max);
        var name = textArray[i];
        
        if (roll > h_val) {
            h_val = roll;
            h_name = name;
        }
        
        output += name+" - "+roll+" :Dosh: ";
    }
    
    output += "_"+h_name+"_ wins with a roll of _"+h_val+"_!";
    // Return results
    return output;
}

// The Killing Floor quote board
function killingFloorDosh() {
	var quoteN = getRandom (0, 9);   
    var quotes = ["Let's go shopping chaps.",
                  "Money, money, MONEY!",
                  "It's raining money!",
                  "Dosh! Grab it while it's hot.",
                  "Bank of Me, open for business.",
                  "Loadsamoney!",
                  "Dosh! Grab it while you can, lads.",
                  "A bit of spending money for you.",
                  "Cash here! Grab it all.",
                  "Cha-ching! Money money money!"
                  ]
    
    return ":Dosh::Dosh::Dosh: "+quotes[quoteN]+" :Dosh::Dosh::Dosh:";
}

// MEGA DOSH
function megaDosh() {
    var dosh = "";
    dosh += ".\n:Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh:\n\n";
    dosh += ":Dosh:  :Dosh:  :Dosh:                 :Dosh:  :Dosh:  :Dosh:                     :Dosh:  :Dosh:             :Dosh:         :Dosh:\n";
    dosh += ":Dosh:             :Dosh:         :Dosh:                 :Dosh:              :Dosh:         :Dosh:         :Dosh:         :Dosh:\n";
    dosh += ":Dosh:               :Dosh:      :Dosh:                    :Dosh:                  :Dosh:                 :Dosh:  :Dosh: :Dosh:   \n";
    dosh += ":Dosh:             :Dosh:         :Dosh:                 :Dosh:          :Dosh:          :Dosh:            :Dosh:         :Dosh:\n";
    dosh += ":Dosh:  :Dosh:  :Dosh:                 :Dosh:  :Dosh:  :Dosh:                :Dosh:  :Dosh:                  :Dosh:         :Dosh:\n\n";
    dosh += ":Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh:\n";
    return dosh;
}

// COUNTDOWN FUNCTIONS
// =======================================================================================
var count, counter, countValid = false;

// Start a countdown
function startCount(time) {
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
function stopCount() {
    countValid = false;
}

// TIMER FUNCTIONS
// =======================================================================================
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


// TIME AND DATE FUNCTIONS
// =======================================================================================
// Get time & date
function timeAndDate() {
	var tnD = new Date();
    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = tnD.getMonth();
    
    return chatBot+"The time is currently "+tnD.getHours()+":"+tnD.getMinutes()+":"+tnD.getSeconds()+", and the date is the "+getDay(tnD)+" of "+months[month]+", "+tnD.getFullYear()+".";
}

// Get date with suffix
function getDay(date) {
    var day = date.getDate();
    var result = day;
    
    if ((day % 10 == 1 || day == 1) && day != 11) {
        result += "st";
    } else if ((day % 10 == 2 || day == 2) && day != 12) {
        result += "nd";
    } else if ((day % 10 == 3 || day == 3) && day != 13) {
        result += "rd";
    } else {
        result += "th";
    }
    
    return result;
}

//CHAT POLL
//=======================================================================================
function click(el){
    var ev = document.createEvent("MouseEvent");
    ev.initMouseEvent(
        "click",
        true /* bubble */, true /* cancelable */,
        window, null,
        0, 0, 0, 0, /* coordinates */
        false, false, false, false, /* modifier keys */
        0 /*left*/, null
    );
    el.dispatchEvent(ev);
}

// Click all the names to open them up
var numOffline = $J('.offline').length, chatLen = new Array(), lastCleared;
$J('.in-game').each(function(){click(this)});
$J('.online').each(function(){click(this)});

//The polling function
var chatPoll = function() {
    if (lastCleared == 600) {
        console.clear();
        lastCleared = 0;
    }

    // Check if any people have come online/gone offline
    if (numOffline != $('.offline').length) {
        numOffline = $('.offline').length;

        // Click all the names to open them up
        $('.in-game').each(function(){click(this)});
        $('.online').each(function(){click(this)});

        // Clear array
        chatLen.length = 0;
    }
    
    // Check each chat for new stuffs
    $('.chat_dialog').each(function(index){
        newChatLen = $(this).find('.chat_message_text').length;
        if (chatLen[index] != newChatLen) {
            // Get the latest message
            var message = $(this).find('.chat_message_text').last().text();

            // Log new message
            var person = $J(this).find('.persona').last().text();
            console.log(person+": "+message);

            // Get the correct chat window
            var recipient = $J(this).find('.chatdialog_header').attr('data-miniprofile');
            $J('.friendslist_entry[data-miniprofile = "'+recipient+'"]').click();

            //console.log("clicking on"+ clicking.text());
            chatLen[index] = newChatLen;
            // Execute the command
            
            chooseAction(message);
        }
    });

    lastCleared++;
}

setInterval(function(){
	chatPoll();
},100);




// SEND MESSAGE FUNCTION
// @copyright  2013+, Andrew Silver
// @url 	   http://userscripts.org/scripts/review/174282
// =======================================================================================
function sendMessage(strMessage){
	if ( !Chat.m_ActiveFriend )
		return;

	//var strMessage = $J.trim( $J('#chatmessage').val() );

	if ( strMessage.length == 0 )
		return;

	var ulSteamIDActive = Chat.m_ActiveFriend.m_ulSteamID;

	var rgParams = {
		umqid: Chat.m_umqid,
		type: 'saytext',
		steamid_dst: ulSteamIDActive,
		text: strMessage
	};

	var _chat = Chat;
	var Friend = Chat.m_ActiveFriend; //capture friend at time of sending

	Chat.AddToRecentChats( Friend );

	// echo immediately
	var elMessage = _chat.m_rgChatDialogs[ Friend.m_unAccountID ].AppendChatMessage( _chat.m_User, new Date(), strMessage, CWebChat.CHATMESSAGE_TYPE_LOCALECHO );
	$J('#chatmessage').focus();

	Chat.m_WebAPI.ExecJSONP( 'ISteamWebUserPresenceOAuth', 'Message', rgParams, true ).done( function(data) {

	}).fail( function () {
		$J('#chatmessage').val( strMessage );
		alert( 'Failed to send chat message' );
	});
}
