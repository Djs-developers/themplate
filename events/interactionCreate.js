const fs = require('fs');
const { check } = require('../handler/perms.js');

client.on("interactionCreate", async (interaction) => {
  var cmd = null;

  const permission = check(interaction, 'command');

  if (!permission) return;

  if (interaction.isCommand()) {
    if (fs.existsSync(`./src/commands/${interaction.commandName}.js`)) {
      cmd = require(`../src/commands/${interaction.commandName}.js`);
      cmd.interactionRun(client, interaction, db);
    };
  };

  if (interaction.isButton()) {
    if (fs.existsSync(`./src/buttons/${interaction.customId}.js`)) {
      cmd = require(`../src/buttons/${interaction.customId}.js`)(client, interaction, db);
    };
  };

  if (interaction.isSelectMenu()) {
    if (fs.existsSync(`./src/menu/select/${interaction.customId}.js`)) {
      cmd = require(`../src/menu/select/${interaction.customId}.js`)(client, interaction, db);
    };
  };

  if (interaction.isContextMenu()) {
    if (fs.existsSync(`./src/menu/context/${interaction.customId}.js`)) {
      cmd = require(`../src/menu/context/${interaction.customId}.js`)(client, interaction, db);
    };
  };

  if (interaction.isModalSubmit()) {
    if (fs.existsSync(`./src/modals/${interaction.customId}.js`)) {
      cmd = require(`../src/modals/${interaction.customId}.js`)(client, interaction, db);
    };
  };

});