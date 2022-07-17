const { MessageEmbed } = require('discord.js');

module.exports = {
    success: {
        
    },
    error: {
        blacklist: 'Il tuo server è in blacklist, per maggiori informazioni apri un ticket sul server di supporto.',
        disabled: 'Comando attualmente disabilitato!',
        notSetup: 'Sembra che questo server non sia stato settato! Settalo con il comando `sky.setup`',
        permissions: 'Permessi mancanti, riaggiungi il bot al server!',
        setup: new Discord.MessageEmbed()
        .setTitle('Errore')
        .setColor('RED')
        .setDescription('Sembra che il tuo server non sia stato settato correttamente!\nSe sei parte di una catena, contatta il rappresentante chiedendo di rimuovere e riaggiungere il server.\nSe invece non fai parte di una catena, usa il comando /leave e poi /setup.'),
    },
    other: {

    },
}