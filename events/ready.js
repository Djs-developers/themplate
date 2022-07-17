client.on("ready", () => {

    require('../handler/perms.js').load();
    require('../handler/alias.js').load();

	console.log(`Loggato come ${client.user?.tag}`);
    
});