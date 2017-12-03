var Discord = require('discord.io');
var logger = require('winston');
var auth = require('./auth.json');
const complexealpha = require('./complexealpha');
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});
bot.on('message', function (user, userID, channelID, message, evt) {
    if(message.toLowerCase().includes("ordinateur")){
        var citoyen = complexealpha.findCitoyen(userID, user, channelID)
        var citoyen_id = citoyen.id()
        // Le bot réagit dès lors qu'on prononce le mot "ordinateur", et attends uniquement la phrase "Bonjour Ordinateur!"
        // Toute erreur engendre de la trahison...
        if(message == "Bonjour Ordinateur!"){
            reponse = "BONJOUR CITOYEN " + citoyen_id + "."
        } else {
            reponse = "CITOYEN " + citoyen_id + ". VOTRE MECONNAISSANCE DU PROTOCOLE 351 EST UN ACTE DE TRAHISON."        
        }

        // L'ordinateur réponds toujours en majuscule
        bot.sendMessage({
            to: channelID,
            message: reponse.toUpperCase()
        });


    }
});