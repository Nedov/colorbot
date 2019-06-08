const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs');
let prefix = '!!'
let profile = require('./profile.json');
bot.mutes = require("./mutes.json");
let moment = require('moment');
let ms = require('ms');
let config = require('./config.json');


function randColor() {
    var r = Math.floor(Math.random() * (256)),
        g = Math.floor(Math.random() * (256)),
        b = Math.floor(Math.random() * (256));
    return '#' + r.toString(16) + g.toString(16) + b.toString(16);
}
setInterval(() => {
bot.guilds.get("565881635359293451").roles.find(r => r.name === "Лоликонщик").setColor(randColor())
}, 1500)





bot.login(process.env.BOT_TOKEN);
