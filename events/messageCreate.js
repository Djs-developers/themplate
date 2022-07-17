const fs = require('fs');
const { prefix } = require('../config.json');
const { check } = require('../handler/perms.js');

client.on("messageCreate", async (message) => {
  var cmd = null;
  var msg = null;

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  const permission = check(message, 'message');

  if (!permission) return;
 
  var args = message.content.trim().split(/ +/g);
  cmd = args[0].slice(prefix.length).toLowerCase();
  
  if (fs.existsSync(`./src/commands/${cmd}.js`)) {
    msg = require(`../src/commands/${cmd}.js`);
    msg.messageRun(client, message, db, args);
  } else {
    if (!fs.existsSync(`./src/messages/${cmd}.js`)) return;
    require(`../src/messages/${cmd}.js`)(client, message, db, args);
  }

});