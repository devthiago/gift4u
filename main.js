var fs = require('fs'),
	prompt = require('prompt'),
	people = JSON.parse(fs.readFileSync('people.json', 'utf8')),
	winners = JSON.parse(fs.readFileSync('winners.json', 'utf8')),
	len = people.length
	promptScheme = {
	    properties: {
	    	gift: {
	    		description: 'What\'s the gift?'.magenta
	    	},
	    	winner: {
	    		description: 'There is a winner? (y/n)'.magenta
	    	}
	    }
	};

function getWinner () {
	var person = people[Math.floor(Math.random() * len)];
	if ( winners.hasOwnProperty(person.name) ) {
		return getWinner();
	} else {
		return person;
	}
}

function saveWinner (person, gift) {
	winners[person.name] = person;
	winners[person.name]['gift'] = gift || "Gift not defined";
	fs.writeFile("winners.json", JSON.stringify(winners));
}

function onPromptError(err) {
	console.log(err);
	return 1;
}

var person = getWinner();
console.log('\n\n' + person.name + '\n\n');

prompt.start();
prompt.message = "";
prompt.delimiter = "";

prompt.get(promptScheme, function (err, result) {
	if (err) {
		return onPromptError(err);
	}
	var gift = result.gift;
	if (result.winner === 'y') {
		saveWinner(person, gift);
		console.log('\n\nCongratulations!!! \n\n');
	} else {
		console.log('\n\nSorry... next!!!\n\n');
	}
});

