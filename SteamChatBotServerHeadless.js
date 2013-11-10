var page = require('webpage').create();
//We want to output text from page eval to the terminal
page.onConsoleMessage = function(msg) {
    console.log(msg);
};

phantom.addCookie({
	'name':     'steamLogin',   /* required property */
    'value':    '76561197985649468%7C%7C724334D06C2D522254AD8728BB5D6A8F85AA3F74',  /* required property */
    'domain':   'steamcommunity.com',           /* required property */
    'path':     '/',
    'httponly': true,
    'secure':   false,
    'expires':  (new Date()).getTime() + (1000 * 60 * 60 * 24 * 365 * 100)   /* <-- expires in 100 years */
});



page.open('http://steamcommunity.com/chat/', function(status) {
    if (status !== 'success') {
        console.log('Unable to open page.');
    } else {
        console.log("Page opened, injecting javascript");
        
        page.injectJs("jquery-2.0.3.min.js");
        console.log("jquery-2.0.3.min.js loaded");
        
        page.injectJs("jquery.mutationobserver.js");
        console.log("jquery.mutationobserver.js loaded");
        
        page.injectJs("http://courses.ischool.berkeley.edu/i290-4/f09/resources/gm_jq_xhr.js");
        console.log("gm_jq_xhr.js loaded");
        
        
        page.injectJs("SteamChatBot.js");
        console.log("SteamChatBot.js loaded - SteamChatBot is now running");
    }
	
});

var i = 0;
function takepic() {
    page.render('pics/pic'+i+'.png');
    i = i+1;
}

//setInterval(function(){
//   takepic();
//},500);