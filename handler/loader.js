const fs = require('fs');
require('../logs/error/error.js');
require('../logs/debug/debug.js');

console.log('Loading commands...');
var commandsFile = fs.readdirSync('./src/commands').filter(file => file.endsWith('.js'));
var contextFile = fs.readdirSync('./src/menu/context').filter(file => file.endsWith('.js'));
var existedCommands = client.application.commands.cache.toJSON();
var commands = [];
for (const file of commandsFile) {
	let command = require(`../src/commands/${file}`);
	if (existedCommands.includes(command.data.toJSON().name)) continue;
	commands.push(command.data.toJSON());
  console.log(`-> Loaded command ${file}`);
};

for (const file of contextFile) {
	let command = require(`../src/menu/context/${file}`);
	if (existedCommands.includes(command.data.toJSON().name)) continue;
	commands.push(command.data.toJSON());
  console.log(`-> Loaded context menu ${file}`);
};

client.on('ready', () => { client.application.commands.set(commands); });

console.log('Loading events...');
const eventFile = fs.readdirSync('./events').filter(file => file.endsWith('.js'));
for (const file of eventFile) {
	require(`../events/${file}`);
  	console.log(`-> Loaded event ${file}`);
};
console.log('Events updated')