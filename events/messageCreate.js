const fs = require('fs');
const { prefix } = require('../config.json');
const { check } = require('../handler/perms.js');
const { get } = require('../handler/alias.js');

client.on("messageCreate", async (message) => {
  let cmd;
  let msg;

  if (!message.content.startsWith(prefix)) return;
  if (message.author.bot) return;

  const permission = check(message, 'message');

  if (!permission) return;

  let args = message.content.trim().split(/ +/g);
  cmd = get(message);
  
  if (fs.existsSync(`./src/commands/${cmd}.js`)) {
    msg = require(`../src/commands/${cmd}.js`);
    msg.messageRun(client, message, db, args);
  } else {
    if (!fs.existsSync(`./src/messages/${cmd}.js`)) return;
    require(`../src/messages/${cmd}.js`)(client, message, db, args);
  }

});