// The actions module for JEB
// @author Nathaniel Oon
// @date 2013

// Add commands to array
commands.push(['flipC', flipCoin]);
commands.push(['rollD', rollDie]);
commands.push(['rollH', rollHundred]);
commands.push(['rollN', rollNumber]);
commands.push(['rollL', rollList]);
commands.push(['kfdosh', killingFloorDosh]);
commands.push(['DOSH', megaDosh]);

// Get a random number (will be a float)
function getRandom(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Flip a coin
function flipCoin(text) {
    var coin = getRandom(0, 2);
    
    if (coin == 1) {
        coin = "Tails";
    } else {
        coin = "Heads";
    }
    
    console.log("Flip a coin: "+coin);
    var output = chatBot+":penny::penny::penny: The coin lands on _"+coin+"_! :penny::penny::penny:";

    sendMessage(output);
}

// Roll a die
function rollDie(text) {
    var die = getRandom(0, 6);
    console.log("Roll a die: "+die);

    var output = chatBot+":luck::luck::luck: You rolled a _"+die+"_! :luck::luck::luck:";

    sendMessage(output);
}

// Roll out of one hundred
function rollHundred(text) {
    var hund = getRandom(0, 100);
    console.log("Roll out of one hundred: "+hund);
    var output = chatBot+":hex::hex::hex: You rolled a _"+hund+"_! :hex::hex::hex:";

    sendMessage(output);
}

// Roll to a roll of your choice
function rollNumber(text) {
    var n = text[1];
    console.log("n is "+n);
    // Validity check
    if (n != parseInt(n, 10)) return chatBotErr+"The second argument for _rollN_ must be a number.";
    
    // Roll the number
    var num = getRandom(0, n);
    console.log("Roll to a max of "+n+": "+num);
    var output = chatBot+":vaultkey::vaultkey::vaultkey: You rolled a _"+num+"_ out of _"+n+"_! :vaultkey::vaultkey::vaultkey:";

    sendMessage(output);
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

    sendMessage(output);
}

// The Killing Floor quote board
function killingFloorDosh(text) {
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
    
    var output = ":Dosh::Dosh::Dosh: "+quotes[quoteN]+" :Dosh::Dosh::Dosh:";

    sendMessage(output);
}

// MEGA DOSH
function megaDosh(text) {
    var dosh = "";
    dosh += ".\n:Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh:\n\n";
    dosh += ":Dosh:  :Dosh:  :Dosh:                 :Dosh:  :Dosh:  :Dosh:                     :Dosh:  :Dosh:             :Dosh:         :Dosh:\n";
    dosh += ":Dosh:             :Dosh:         :Dosh:                 :Dosh:              :Dosh:         :Dosh:         :Dosh:         :Dosh:\n";
    dosh += ":Dosh:               :Dosh:      :Dosh:                    :Dosh:                  :Dosh:                 :Dosh:  :Dosh: :Dosh:   \n";
    dosh += ":Dosh:             :Dosh:         :Dosh:                 :Dosh:          :Dosh:          :Dosh:            :Dosh:         :Dosh:\n";
    dosh += ":Dosh:  :Dosh:  :Dosh:                 :Dosh:  :Dosh:  :Dosh:                :Dosh:  :Dosh:                  :Dosh:         :Dosh:\n\n";
    dosh += ":Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh::Dosh:\n";
    var output = dosh;

    sendMessage(output);
}