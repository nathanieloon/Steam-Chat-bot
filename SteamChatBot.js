// select the target node

$(document).ready(function() {
    if (typeof Chat === 'undefined') {
        console.log("ERROR: The chat didn't load properly - check your cookies.");
    }
});

var chatBotName = "JEB";
var chatBotDisplayName = "J.E.B";
var chatBotFullName = "Jaunty Entertainment Bot ("+chatBotDisplayName+")";
var chatBot = "["+chatBotDisplayName+"] ";
var chatBotErr = "["+chatBotDisplayName+"] Error: ";
var version = 2.0;


// ACTION CHOOSER
// =======================================================================================
// Choose option for flip/roll
function chooseAction(given, person) {
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

    // Switch case for action controls
    //console.log("Action: "+action);
    switch (action) {
        case "/flipC":
            sendMessage(flipCoin());
            break;
        case "/rollD":
            sendMessage(rollDie());
            break;
        case "/rollH":
            sendMessage(rollHundred());
            break;
        case "/rollN":
            sendMessage(rollNumber(val));
            break;
        case "/rollL":
            sendMessage(rollList(text));
            break;
        case "/KFsb":
            sendMessage(killingFloorDosh());
            break;
        case "/DOSH":
            sendMessage(megaDosh());
            break;
        case "/getTime":
            sendMessage(timeAndDate());
            break;
        case "/getHelp":
            sendMessage(showHelp());
            break;
        case "/timerHelp":
            sendMessage(timerHelp());
            break;
        case "/about"+chatBotName:
            sendMessage(showVersion());
            break;
        case "/startCount":
            startCount(val);
            break;
        case "/stopCount":
            stopCount();
            break;
        case "/startTimer":
            sendMessage(startTimer(val));
            break;
        case "/stopTimer":
            sendMessage(stopTimer(val));
            break;
        case "/checkTimer":
            sendMessage(checkTimer(val));
            break;
        case "/listTimers":
            sendMessage(checkAllTimers());
            break;
        case "/stopTimers":
            sendMessage(stopAllTimers());
            break;
    }

    // AFK controls
    if (action == "/afk") {
        sendMessage(setAfk(person, given));
    } else if (action != "["+chatBotDisplayName+"]") {
        //console.log(person + " AFK ACTION HERE");
        if (isAfk(Chat.m_User.m_strName) && (Chat.m_User.m_strName != person)) {
            //console.log("userafk");
            sendMessage(afkMsg(Chat.m_User.m_strName));
        }

        if (isAfk(Chat.m_ActiveFriend.m_strName) && (Chat.m_User.m_strName == person)) {
            //console.log("friendafk");
            sendMessage(afkMsg(Chat.m_ActiveFriend.m_strName));
        }
    }
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
    
    // This section could probably do with some refactoring, if possible, as it's the
    // main source of complexity

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
            chooseAction(message, person);
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
