const Discord = require('discord.js');
const { MongoClient } = require('mongodb');
const { token, dburl } = require('./config.json');

global.client = new Discord.Client({ intents: ['GUILDS', 'GUILD_MESSAGES', 'GUILD_MEMBERS', 'GUILD_INVITES'] });
global.mongoose = new MongoClient(dburl, { useUnifiedTopology: true })

mongoose.connect(function (err) {
	if (err) {
		console.error(err)
	} else {
		console.log('Connessione a MongoDB avvenuta con successo!')
		require('./handler/loader.js');
        require('./handler/help.js');
	}
}, { autoIndex: false })

client.login(token)