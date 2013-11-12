// The AFK module for JEB
// @author Nathaniel Oon
// @date 2013
var afkList = new Array(), afkMsgs = new Array();


// Changing AFK state
function setAfk(person, message) {
    var msg = message.substr(5); // any better way to handle this?
    if (afkList.indexOf(person) == -1) {
        afkList.push(person);
        afkMsgs.push(msg);
        return chatBot+person+" is now AFK.";
    } else {
        afkList.splice(afkList[person.indexOf], 1);
        afkMsgs.splice(afkList[msg.indexOf], 1);
        return chatBot+person+" is no longer AFK.";
    }
}

// Return the person's AFK message
function afkMsg(person) {
    var msg = afkMsgs[afkList.indexOf(person)];
    if (msg != "") {
        var result = chatBot+person+" is currently AFK. Reason: \""+msg+"\"";    
    } else {
        var result = chatBot+person+" is currently AFK.";
    }
    
    return result;
}

// Function to check if a person is AFK or not
function isAfk(person) {
    if (afkList.indexOf(person) == -1) {
        return false;
    }
    return true;
}