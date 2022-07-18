const { readdirSync } = require("fs");
const { Collection } = require("@discordjs/collection");
const path = require("path");
const alias = new Collection();

module.exports = {
    load: async () => {

        const messageFileArray = readdirSync("./src/messages").filter(file => file.endsWith('.js'));

        for (const file of messageFileArray) {
            const message = require(`../src/messages/${file}`);
            if (message.alias && message.alias > 0) alias.set(path.parse(file).name, message.alias);
        };

        const commandFileArray = readdirSync("./src/commands").filter(file => file.endsWith('.js'));

        for (const file of commandFileArray) {
            const command = require(`../src/commands/${file}`);
            if (command.alias && command.alias > 0) alias.set(path.parse(file).name, command.alias);
        };

    },

    get: async (message) => {
        const args = message.content.trim().split(/ +/g);
        const cmd = args[0].slice(prefix.length).toLowerCase();
        return alias.findKey(key => key.alias.include(cmd)) || cmd;
    }
};