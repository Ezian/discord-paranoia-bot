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
            // TODO vérifier que le citoyen n'a pas déjà dit bonjour  aujourd'hui, sinon l'accuser de rompre le protocole 87 ce qui constitue une trahison
            reponse = "BONJOUR CITOYEN " + citoyen_id + "."
        } else {
            // TODO vérifier les griefs et les ajouter à la réponse :
            // protocole 96 : il faut mettre une majuscule à l'Ordinateur
            // protocole 27 : les majuscules sont reservée à l'Ordinateur
            // protocole 87 : avoir (tenté) de dire bonjour une seconde fois dans la journée
            // protocole 1 : invoquer l'Ordinateur sans raison valable (en gros avoir utilisé le mot dans tout autre contexte)
            reponse = "CITOYEN " + citoyen_id + ". VOTRE MECONNAISSANCE DU PROTOCOLE 351 EST UN ACTE DE TRAHISON."        
        }

        // L'ordinateur réponds toujours en majuscule
        bot.sendMessage({
            to: channelID,
            message: reponse.toUpperCase()
        });


    }
    // TODO : protocole !execute CITOYEN_ID
    // - Si la cible n'est pas connectée, l'auteur écope d'une étoile de trahison
    // - Sinon, la cible est exécutée (trahison resetté, numéro de clone incrémenté)
    // - si la cible a 5 en trahison, alors l'auteur a une hausse d'accréditation (sauf s'il est déjà Ultraviolet, auquel cas il veut sans doute prendre la place de l'Ordinateur, ce qui constitue une trahison, sa trahison est immédiatement mise à 5 et un mandat d'arrêt émis)
    // - sinon, l'auteur écope d'une étoile de trahison
});

// TODO Rajouter un test à la fin de chaque journée resettant les salutations des citoyens et ajoutant une étoile de trahison (max 5) à ceux n'ayant pas dit bonjour
// TODO Rajouter un test à la fin de chaque journée émettant des mandats d'arrêts contre les citoyens ayant 5 étoile
