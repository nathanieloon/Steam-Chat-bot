// The time and date module for JEB
// @author Nathaniel Oon
// @date 2013

// Get time & date
function timeAndDate(text) {
    var tnD = new Date();
    var months = ["January", "Febuary", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = tnD.getMonth();
    
    var output = chatBot+"The time is currently "+tnD.getHours()+":"+tnD.getMinutes()+":"+tnD.getSeconds()+", and the date is the "+getDay(tnD)+" of "+months[month]+", "+tnD.getFullYear()+".";

    sendMessage(output);
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