var gamePrompt = require("game-prompt");
var colors = require('colors');

//PLANETS
var Earth = {
	location: 0
};

var Mesnides = {
	name: "Mesnides",
	inhabited: true,
	location: -20,
	message: ["You've arrived at Mesnides. As you land, a representative of the Mesnidian people " +
			"is there to greet you.", 
			'"Welcome, traveler, to Mesnides."'],
	artifactMessage: '"Here, take this Myoin Horn, an ancient Mesnidian instrument."', 
	artifact: "Myoin Horn",
	planets: '"Well, Laplides suffered from atomic war and has been uninhabited for centuries. You would do well to avoid it on your journey."'
};

var Laplides = {
	name: "Laplides",
	inhabited: false,
	location: 50,
	message: "You enter orbit around Laplides. Looking down at the planet, you see signs of atomic war and realize there is no option but to turn around."
};

var Kiyturn = {
	name: "Kiyturn",
	inhabited: true,
	location: -100,
	message: ["You've arrived at Kiyturn. As you land, a representative of the Kiyturn people " + 
			"is there to greet you.", 
			'"Hello, what brings you to Kiyturn?' + " You're not here to cause trouble are you?\""],
	artifactMessage: "Here, take this Kiyturn Glass Bowl, a symbol of our civilization.",
	artifact: "Kiyturn Glass Bowl",
	planets: "\"I'm sorry, but we do not leave our planet. The universe, to us, is a beautiful mystery.\""
};

var Aenides = {
	name: "Aenides",
	inhabited: false,
	location: 25,
	message: "You discover upon arrival to Aenides that they are a hostile people. " + 
			"You attempt to land, but they begin to fire upon your S.R.S.V. and you are forced to retreat."
};

var Cramuthea = {
	name: "Cramuthea",
	inhabited: false,
	location: 200,
	message: "Cramuthea has been abandoned due to global environmental disaster, " +
		"but there are remnants of the people that left. " + 
		"You are able to refuel your ship (+500 gallons) and read a beacon signal that tells you the " + 
		"Cramuthean people have migrated to Smeon T9Q."
};

var Smeon = {
	name: "Smeon T9Q",
	inhabited: true,
	location:  400,
	message: ["You've arrived at Smeon T9Q and find that the friendly Cramuthean people now live here. ",
			"A kind representative gives you 100 gallons of fuel upon your arrival."],
	artifactMessage: '"Here, take this Cramun Flower, a token from our home planet."',
	artifact: "Cramun Flower",
	planets: "Beware of the people of Aenides. They once tried to take over our home planet by force."
};

var Gleshan = {
	name: "Gleshan 7Z9",
	inhabited: true,
	location:  -85,
	message: ["You've arrived at Gleshan 7Z9. As you land, a representative " + 
			"of the Gleshan people is there to greet you.",
			'"Welcome to Gleshan 7Z9."'],
	artifactMessage: '"Gleshan is a poor country. We do not have anything to give."',
	artifact: null,
	planets: "The wealthy people of Cramuthean once visited Gleshan 7Z9."
};

//Global Variables
var playerName;
var vehicleName;
var inventory = [];
var gallons = 1000;
var currentPlanet = Earth;

function distance(x,y) {
	return Math.abs(x - y);
}

//functions
function startGame() {
	gamePrompt("S.R.S.V Press ENTER to start.", intro);
}

function intro() {
	gamePrompt("You are the captain of a Solo Research Space Vehicle (S.R.S.V.) ".blue + 
			"on an expedition to explore foreign planets. ".blue + 
			"Your mission is to make contact with three alien life forms, ".blue + 
			"acquire an artifact representative of their culture, ".blue + 
			"and bring back your findings to Earth.".blue, collectInfo);
}

function collectInfo() {
	gamePrompt([
		'A voice comes on over the intercom.',
		'"Please state your name for identity verification"'
		], collectName)
}

function collectName(name) {
	playerName = name;
	gamePrompt([
		'"Thank you Captain ' + playerName + '. "',
		'"Please state your vehicle name for identity verification."'
		], collectVehicle);
}

function collectVehicle(name) {
	vehicleName = name;
	gamePrompt([
		'"Thank you Captain ' + playerName + '. "',
		displayGallons(gallons)], navigation);
} 

function navigation() {
	gamePrompt(
		'\nWhere to Captain ' + playerName + '?'+
		'\n(E)arth (' + distance(currentPlanet.location, Earth.location) +' lightyears)' +
		'\n(M)esnides (' + distance(currentPlanet.location, Mesnides.location) +' lightyears)' +
		'\n(L)aplides (' + distance(currentPlanet.location, Laplides.location) +' lightyears)' +
		'\n(K)iyturn (' + distance(currentPlanet.location, Kiyturn.location) +' lightyears)' +
		'\n(A)enides (' + distance(currentPlanet.location, Aenides.location) +' lightyears)' +
		'\n(C)ramuthea (' + distance(currentPlanet.location, Cramuthea.location) +' lightyears)' +
		'\n(S)meon T9Q (' + distance(currentPlanet.location, Smeon.location) +' lightyears)' +
		'\n(G)leshan 7Z9 (' + distance(currentPlanet.location, Gleshan.location) +' lightyears)'
		, planetChoice);
}


function displayGallons(gallons) {
	if (gallons > 500) {
		return (vehicleName + " currently has " + gallons + " gallons.").green;
	} else if (gallons > 125) {
		return (vehicleName + " currently has " + gallons + " gallons.").yellow;
	} else {
		return (vehicleName + " currently has " + gallons + " gallons.").red;
	}
}

function planetChoice(choice){
	switch(choice) {
		case "E":
			earth();
			break;
		case "M": 
			goTo(Mesnides);
			break;
		case "L":
			goTo(Laplides);
			break;
		case "K":
			goTo(Kiyturn);
			break;
		case "A":
			goTo(Aenides);
			break;
		case "C":
			goTo(Cramuthea);
			gallons = gallons + 500;
			break;
		case "S":
			goTo(Smeon);
			gallons = gallons + 100;
			break;
		case "G":
			goTo(Gleshan);
			break;
		default:
			gamePrompt("INVALID INPUT.".red + "\ntry again", navigation);
	}
}

function earth() {
	if (inventory.length >= 3) {
		gamePrompt([
			"Now landing on planet Earth".blue,
			('You have returned to planet Earth with 3 artifacts. ').green,
			('Congrtualizations, Captain' + playerName + ', YOU WIN!!!').green
			]);
	} else {
		gallons = gallons + 10;
		gamePrompt([
			"Now landing on planet Earth".blue,
			"...Refueling +10 gallons"
			],
		 navigation);
	}
}


function goTo(planet) {
	console.log(("...Flying to " + planet.name + "...\n").grey);
	var gallonsUsed = distance(currentPlanet.location, planet.location);
	gallons -= gallonsUsed;
	console.log(("You used " + gallonsUsed + " gallons of gas. ").grey + displayGallons(gallons)+"\n");
	currentPlanet = planet;
	if (gallons <= 0) {
		gamePrompt(["You ran out of gas before you returned to planet Earth with 3 artifacts. ".red,
			"YOU LOSE.".red])
	}
	else if (planet.inhabited == true) {
		gamePrompt(planet.message, assistance);
	} else {
		gamePrompt(planet.message, navigation);
	}	
}

function assistance() {
	gamePrompt('"How can we assist you?"' +
				'\nAsk about (A)rtifact.' +
			   	'\nAsk about other (P)lanets' +
			   	'\n(L)eave', assistInput);
}

function addArtifact(artifact) {
	var exists = false;
	for (var i = 0; i < inventory.length; i++) {
		if (artifact === inventory[i]) {
			exists = true;
		}
	}
	return exists;
}

function assistInput(input) {
	switch(input) {
		case "L":
			gamePrompt("Leaving Planet...", navigation);
			break;
		case "A":
			var alreadyOwns = addArtifact(currentPlanet.artifact);
			if(alreadyOwns === true) {
				gamePrompt(("\nYou already have this planet's artifact in your inventory.").red, 
							assistance);
			} else {
				if (currentPlanet.artifact !== null) {
					inventory.push(currentPlanet.artifact);
					gamePrompt([
						currentPlanet.artifactMessage,
						(currentPlanet.artifact + " has been added to your inventory.").green
					], assistance);
				} else {
					gamePrompt([
						currentPlanet.artifactMessage,
						"Nothing has been added to your inventory"
						], assistance);
				}
			}
			addArtifact(currentPlanet.artifact);
			break;
		case "P": 
			gamePrompt(currentPlanet.planets, assistance);
			break;
		default:
			gamePrompt("INVALID INPUT.".red + "\ntry again", assistance);
	}
}

startGame();

