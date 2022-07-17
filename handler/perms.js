const { readdirSync } = require("fs");
const { Collection } = require("@discordjs/collection");
const path = require("path");
const permission = new Collection();

module.exports = {
    load: async () => {

	    const commandFileArray = readdirSync("./src/commands").filter(file => file.endsWith('.js'));

        if (!client.application?.owner) await client.application?.fetch();

        var fullPermissions = []

        for (const file of commandFileArray) {

            const command = require(`../src/commands/${file}`);
            if (command.perms && command.perms.length > 0) {

                const permissions = {
                    id: path.parse(file).name,
                    permissions: command.perms
                };

                fullPermissions.push(permissions);

            };
            
        };
            
        permission.set('commands', fullPermissions);
        const messageFileArray = readdirSync("./src/messages").filter(file => file.endsWith('.js'));

        var fullPermissions = []

        for (const file of messageFileArray) {
            const message = require(`../src/messages/${file}`);
            if (message.perms && message.perms > 0) {

                const permissions = {
                    id: path.parse(file).name,
                    permissions: message.perms
                };

                fullPermissions.push(permissions);

            };
        };

        permission.set('messages', fullPermissions);
    },

    check: async (message) => {
        const messageperms = permission.get('messages');
        const commandperms = permission.get('commands');
        var cmd = null;

        if (type = 'message') {
            var args = message.content?.trim().split(/ +/g);
            if (!args) return;
            cmd = args[0].slice(prefix.length).toLowerCase();
        };
        if (type = 'command') {
            cmd = interaction.commandName;
        };

        if (fs.existsSync(`./src/commands/${cmd}.js`)) {
            for (const perms of commandperms) {
                if (!perms.id === cmd) continue;
                if (message.guild.me.permissions.has(perms.permissions)) {
                    return true;
                } else {
                    return false;
                };
            };
        } else {
            if (!fs.existsSync(`./src/messages/${cmd}.js`)) return false;
            for (const perms of messageperms) {
                if (!perms.id === cmd) continue;
                if (message.guild.me.permissions.has(perms.permissions)) {
                    return true;
                } else {
                    return false;
                };
            };
        };

        return true;
    }
};