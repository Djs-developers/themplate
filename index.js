const Discord = require('discord.js');
const { MongoClient } = require('mongodb');
require('dotenv').config();

global.client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_INVITES'] });
global.mongoose = new MongoClient(process.env['DBURL'], { useUnifiedTopology: true })

mongoose.connect(function (err) {
	if (err) {
		console.error(err)
	} else {
		console.log('Connessione a MongoDB avvenuta con successo!')
		require('./handler/loader.js');
        require('./handler/help.js');
	}
}, { autoIndex: false })

client.login(process.env['TOKEN'])