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




bot.on('ready', () => {
  console.log(`Запустился бот ${bot.user.username}!`);

//   setTimeout(() =>{
//     bot.destroy().then(() =>{
//     bot.login(process.env.BOT_TOKEN)
//     })
//     },60000)
    
  

  

  bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
    console.log(link);
  })
  
  
  
  
//   function randColor() {
//     var r = Math.floor(Math.random() * (256)),
//         g = Math.floor(Math.random() * (256)),
//         b = Math.floor(Math.random() * (256));
//     return '#' + r.toString(16) + g.toString(16) + b.toString(16);
// }
// setInterval(() => {
// bot.guilds.get("565881635359293451").roles.find(r => r.name === "Лоликонщик").setColor(randColor())
// }, 1500)


  
  
});



bot.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type =="dm") return;
  let uid = message.author.id;
  bot.send = function (msg){
    message.channel.send(msg);
  }
  
  
  
  
  
  
  if(message.content.startsWith(prefix+ "eval")){
    if(message.author.id === '564360467666042885' || message.author.id === '270904661458944000'){
    const args = message.content.slice(6).split(' ');
const code = args.join(" ")
        .replace(/bot\.token|bot\[.token.\]/ig, 'kthxbai')
    try {
        let evaled = eval(code);
        if (!code) {
            return message.channel.send("нужна больше кода!");
        }

        if (typeof evaled !== 'string')
            evaled = require('util').inspect(evaled);

        const embed = new Discord.RichEmbed()
            .setTitle(`EVAL ✅`)

            .setColor("0x4f351")
            .addField(`📥 Input:`, `\`\`\`${code}\`\`\` \n`)
            .addField(`📤Output:`, `\`\`\`${(evaled)}\`\`\`\n `)
            .addField(`🛒Type:`, `\`\`\`${(typeof evaled)}\`\`\`\n`);
        message.channel.send({
            embed
        });
    } catch (err) {
 console.log(err)
    }
  }

};
  if(message.content.startsWith(prefix+  "ping")){
     message.reply(`Pong! **\`${bot.pings[0]}ms\`**`);
  }
  


  
});


const size = config.colors;
const rainbow = new Array(size);

for (var i=0; i<size; i++) {
var red = sin_to_hex(i, 0 * Math.PI * 2/3); // 0 deg
var blue = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
var sin = Math.sin(Math.PI / size * 2 * i + phase);
var int = Math.floor(sin * 127) + 128;
var hex = int.toString(16);

return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;
const serverss = ["528264174338310206"]

function changeColor() {
for (let index = 0; index < serverss.length; ++index) {

bot.guilds.get(serverss[index]).roles.find(r => r.name === "шамана").setColor(rainbow[place])
    .catch(console.error);

if(place == (size - 1)){
place = 0;
}else{
place++;
}
}
}

bot.on('ready', () => {
if(config.speed < 10){ process.exit(1);}
setInterval(changeColor, config.speed);
});





bot.login(process.env.BOT_TOKEN);
