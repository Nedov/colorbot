let config = require('./config.json');
const Discord = require("discord.js");
const robot = new Discord.Client();
const prefix = "="
const moment = require('moment');

robot.on('ready', () => {
    console.log(`Запустился бот ${robot.user.username}!`);

//   function randColor() {
//       var r = Math.floor(Math.random() * (256)),
//           g = Math.floor(Math.random() * (256)),
//           b = Math.floor(Math.random() * (256));
//       return '#' + r.toString(16) + g.toString(16) + b.toString(16);
//   }
//   setInterval(() => {
//   robot.guilds.get("510527824894099457").roles.find(r => r.name === "color").setColor(randColor())
//   }, 1500)
robot.generateInvite(["ADMINISTRATOR"]).then(link =>{
    console.log(link);
  })    
robot.user.setPresence({
      game:{
        name:"Собственность Sequel",
        type:"STREAMING",
        url:"https://twitch.tv/sequel"
      }
    });    
   
  
  
    
    
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
const serverss = ["510527824894099457"]

function changeColor() {
for (let index = 0; index < serverss.length; ++index) {

robot.guilds.get(serverss[index]).roles.find(r => r.name === "color").setColor(rainbow[place])
    .catch(console.error);

if(place == (size - 1)){
place = 0;
}else{
place++;
}
}
}

robot.on('ready', () => {
if(config.speed < 10){ process.exit(1);}
setInterval(changeColor, config.speed);
});

robot.login(process.env.BOT_TOKEN);
