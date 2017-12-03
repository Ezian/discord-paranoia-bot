module.exports = {
    findCitoyen: findCitoyen
}

const constants = require("./complexealpha.json")
const db = require("./complexealphadb")

var CITOYENS = new Map()

function generateSector(channelId){
    // TODO générer un nom de secteur en fonction du channel où le citoyen a été repéré pour la première fois par l'ORDINATEUR
    return "TDO"
}

var Citoyen = function(username, channelId){
    this.name = username.toUpperCase()
    this.accreditation = "I"
    this.sector = generateSector(channelId)
    this.num_clone = 1 // On commence toujours au premier clone
    this.traitrise = 0 // A la naissance, un clone n'a pas de traitrise
}

Citoyen.prototype.id = function(){
    return this.name + "-" +this.accreditation +  "-" + this.sector + "-" + this.num_clone
};

function findCitoyen(userID, user, channelId){
    if(!CITOYENS.has(userID)){
        CITOYENS.set(userID, new Citoyen(user, channelId))
    }
    return CITOYENS.get(userID);
}
