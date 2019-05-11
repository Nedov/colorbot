const Discord = require('discord.js');
const bot = new Discord.Client();
bot.commands = new Discord.Collection();
const fs = require('fs');
let prefix = '!'
let profile = require('./profile.json');
bot.mutes = require("./mutes.json");
let moment = require('moment');
let ms = require('ms')





bot.on('ready', () => {
  console.log(`Запустился бот ${bot.user.username}!`);


  let statuses = [
    `${bot.users.size} users || Серверов: ${bot.guilds.size}`,
    `${bot.users.size} users || !help`,
    
  ];

  setInterval(function(){
    let status = statuses[Math.floor(Math.random() * statuses.length)];
    bot.user.setActivity(status, {type:"WATCHING"});
  }, 8000);

  

  bot.generateInvite(["ADMINISTRATOR"]).then(link =>{
    console.log(link);
  })
  
  setInterval(() =>{
bot.guilds.forEach(g=>{
g.channels.forEach(c=>{
if(g.channels.find(f => f.name.includes('👦Пользователей'))){
g.channels.find(f => f.name.includes('👦Пользователей')).setName(`👦Пользователей: ${g.members.size}`)
}
if(g.channels.find(f => f.name.includes('🔧Ботов'))){
g.channels.find(f => f.name.includes('🔧Ботов')).setName(`🔧Ботов: ${g.members.filter(l=>l.user.bot).size}`)
}
if(g.channels.find(f => f.name.includes('👻Каналов'))){
g.channels.find(f => f.name.includes('👻Каналов')).setName(`👻Каналов: ${g.channels.size}`)
}
})
})
},600000)
  
  
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

bot.on("guildCreate", guild => {
let embed = new Discord.RichEmbed()
.setAuthor('Новый сервер')
.addField('Создатель',guild.owner.user.tag)
.setThumbnail(guild.iconURL)
bot.channels.get('571634738264277022').send(embed)
});

bot.on("guildDelete", guild => {
let embed = new Discord.RichEmbed()
.setAuthor('Удалили с сервера')
.addField('Создатель',guild.owner.user.tag)
.setThumbnail(guild.iconURL)
bot.channels.get('571634791427080192').send(embed)
});

bot.on('message', async message => {
  if(message.author.bot) return;
  if(message.channel.type =="dm") return;
  let uid = message.author.id;
  bot.send = function (msg){
    message.channel.send(msg);
  }
  
  
  
  
  // if(!profile[uid]){
  //   profile[uid] ={
  //     coins:10,
  //     warns:0,
  //     xp:0,
  //     lvl:0,
  //     mutes:0,
  //   };
  // };
  // let u = profile[uid];
  // u.coins+=1;
  // u.xp+=15;
  // if(u.xp>=(u.lvl * 250)){
  //   u.xp = 0;
  //   u.lvl += 1;
  // };  

  fs.writeFile('./profile.json',JSON.stringify(profile),(err) =>{
    if(err) console.log(err);
  });
  let user = message.author.username;
  let userid = message.author.id;
  let messageArray = message.content.split(" ");
  let command = messageArray[0].toLowerCase();
  let args = messageArray.slice(1);
  if(!message.content.startsWith(prefix)) return;
  let cmd = bot.commands.get(command.slice(prefix.length));
  if(cmd) cmd.run(bot,message,args); 

  if(command === `${prefix}hello`){
    return message.channel.send("Hello");
  };
  if(command === `${prefix}ping`){
    return message.channel.send('Pong!')
  };
  if(command === `${prefix}author`){
    return message.channel.send("Мой создатель - Ned#8110 :heart:")
  };
  if(command === `${prefix}clear`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("У вас нет прав");
    if(args[0]>100) return bot.send("Укажите значение меньше 100");
    if(args[0]<1) return bot.send("Укажите значение больше 1");
    message.channel.bulkDelete(args[0]).then(() =>{
      message.channel.send(`Удалено ${args[0]} сообщений`).then(msg => msg.delete(15*1000));
  });
  };
  if(command === `${prefix}delete`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав на использование команды!");

    let count = args[0] || 10
    await message.delete()
    await message.channel.bulkDelete(count);
  };
  if(command === `${prefix}say`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав на использование команды!");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
  };
  if(command === `${prefix}send`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send("Недостаточно прав на использование команды!");
    let botmessage = args.join(" ");
    message.delete().catch();
    bot.send(botmessage);
  };
  if(command === `${prefix}serverinfo`){
    let embed = new Discord.RichEmbed()
    .setDescription("Информация о сервере")
    .addField("Создатель сервера", message.guild.owner)
    .addField("Название сервера",message.guild.name)
    .addField("Количество участников",message.guild.memberCount)
    .addField("Количество ролей", message.guild.roles.size)
    .addField("Вы присоединились к серверу",moment(message.guild.joinedAt).format('HH:MM DD-MM-YY'))
    .addField("Создание сервера",moment(message.guild.createdAt).format('HH:MM DD-MM-YY'))
    .setColor('RANDOM')
    .setThumbnail(message.guild.iconURL)

    bot.send(embed);
  }
  
  if(command === `${prefix}userinfo`){
    let a = message.author
    let embed = new Discord.RichEmbed()
    .setDescription("Информация о сервере")
    .addField("Имя пользователя",a.username)
    .addField("Тэг пользователя",a.tag)
    .addField("Создание аккаунта",a.createdAt)
    .setColor('RANDOM')
    .setThumbnail(a.avatarURL)

    bot.send(embed);
  };
  if(command === `${prefix}kick`){
    if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send('Недостаточно прав для использования.')
    else if(!message.guild.me.hasPermission("KICK_MEMBERS")) return message.channel.send('У меня недостаточно прав.')

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!member) return message.channel.send('Укажите существующего пользователя.')
    else if (member.hasPermission("KICK_MEMBERS")) return message.channel.send('Я не могу исключить этого пользователя.')

    let reason = args.slice(1).join(' ') || 'Не указана'

    await member.kick(reason)
    await message.channel.send(`<@${message.author.id}> исключил <@${member.id}>\ **Причина**: ${reason}`)
  };

  if(command === `${prefix}mute`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Недостаточно прав для использования");
  
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("Вы не указали пользователя!");

    if(toMute.id === message.author.id) return message.channel.sendMessage("Вы не можете выдать себе мут!");
    if(toMute.highestRole.position >= message.member.highestRole.position) return message.channel.sendMessage("Вы не можете выдать пользователю мут, который выше или имеет ту же роль, что и вы.");

    let role = message.guild.roles.find(r => r.name === "Muted")
    if(!role) {
      try {
        role = await message.guild.createRole({
          name:"Muted",
          color:"#000000",
          permissions:[]
        });

        message.guilds.channels.forEach(async (channel, id) => {
          await channel.overwritePermissions(role, {
            SEND_MESSAGES: false,
            ADD_REACTIONS: false
          });
        });
    } catch(e){
        console.log(e.stack);
    }
      
    }
let params = message.content.split(" ").slice(1);
      let time = params[1];
if(!time) return message.channel.send('Вы не указали время мута!')
    if(toMute.roles.has(role.id)) return message.channel.sendMessage("Пользователю был выдан мут!");

    bot.mutes[toMute.id] = {
      guild: message.guild.id,
      time: Date.now() + parseInt(args[1]) * 1000
    }
    await toMute.addRole(role);
setTimeout(function(){
        toMute.removeRole(message.guild.roles.find(r => r.name === 'Muted'))
        message.channel.send(`С пользователя ${toMute.user.tag} был снят мут!`)

      }, ms(time));


    fs.writeFile("./mutes.json", JSON.stringify(bot.mutes, null, 4), err => {
      if(err) throw err;
      message.channel.send("Пользователю был выдан мут!");
    });

    return;
  };

  if(command === `${prefix}unmute`){
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.sendMessage("Недостаточно прав для использования");
  
    let toMute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
    if(!toMute) return message.channel.sendMessage("Вы не указали пользователя!");

    let role = message.guild.roles.find(r => r.name === "Muted")
    

    if(!role || !toMute.roles.has(role.id)) return message.channel.sendMessage("Пользователь может говорить в чат!");

    await toMute.removeRole(role);
    message.channel.sendMessage("Пользователь может говорить в чат!")

    return;
  };
  if(command === `${prefix}ban`){
    if(message.member.permissions.has('BAN_MEMBERS')|| message.author.id === '564360467666042885'){
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send('Недостаточно прав для использования.')
    else if(!message.guild.me.hasPermission("BAN_MEMBERS")) return message.channel.send('У меня недостаточно прав.')

    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
    if (!member) return message.channel.send('Укажите существующего пользователя.')
    else if (member.hasPermission("BAN_MEMBERS")) return message.channel.send('Я не могу забанить этого пользователя.')

    let reason = args.slice(1).join(' ') || 'Не указана'

    await member.ban(reason)
    await message.channel.send(`<@${message.author.id}> забанил <@${member.id}>\ **Причина**: ${reason}`)
    }
  };

  if(message.content.startsWith(prefix + 'osu')){
    const osu = require('node-osu');
    const api = new osu.Api("eb295d5ef931ae4dc19b22fd2be407f3e8b3ba3e" , {
        notFoundAsError: true,
        completeScores: false
    })
    let args = message.content.slice(prefix.length).trim().split(/ +/g)
    if(!args[1]) return message.channel.send('Укажите ваш ник')
    api.getUser({u: args.slice(1).join(" ")}).then(user => {
      const embed = new Discord.RichEmbed()
      .setTitle('osu!standart')
      .setThumbnail(`http://s.ppy.sh/a/${user.id}}`)
      .setColor("RANDOM")
      .addField('Псевдоним', user.name, true)
      .addField('pp', Math.round(user.pp.raw), true)
      .addField('Глобальный ранг', user.pp.rank, true)
      .addField('Уровень', Math.round(user.level), true)
      .addBlankField()
      .addField('Страна', user.country, true)
      .addField('Ранг по стране', user.pp.countryRank, true)
      .addField('Количество игр', user.counts.plays, true)
      .addField('Точность', `${user.accuracyFormatted}`, true)
      .setFooter('По запросу ' + message.author.tag, message.author.avatarURL)
      message.channel.send(embed)
    }).catch(err =>{
    message.channel.send('Не удалось найти пользователя!')
    })
  };
  
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

}

if(command === `${prefix}hug`){
  const hug = ["https://s-media-cache-ak0.pinimg.com/originals/49/a2/1e/49a21e182fcdfb3e96cc9d9421f8ee3f.gif", "https://s-media-cache-ak0.pinimg.com/originals/16/46/f7/1646f720af76ea58853ef231028bafb1.gif", "https://media.giphy.com/media/xJlOdEYy0r7ZS/giphy.gif", "http://i.imgur.com/2WywS3T.gif", "http://i.imgur.com/8ruodNJ.gif", "https://myanimelist.cdn-dena.com/s/common/uploaded_files/1461071296-7451c05f5aae134e2cceb276b085a871.gif", "http://i0.kym-cdn.com/photos/images/original/000/931/030/394.gif", "https://media.tenor.co/images/1171c186f9130d1efa4a186ad4371e8c/tenor.gif", "http://cdn.smosh.com/sites/default/files/ftpuploads/bloguploads/0413/epic-hugs-friends-pikachu.gif","https://cdn.discordapp.com/attachments/554377044637646850/554722858278977536/hug_034.gif","https://cdn.discordapp.com/attachments/554377044637646850/554722857457025025/hug_013.gif","https://cdn.discordapp.com/attachments/554377044637646850/554722856928280577/hug_075.gif"]
  const rn = require('random-number')
  
   if (!message.mentions.users.first()) return message.channel.send("Вы не можете обнять воздух...");
  if(message.mentions.users.first() === message.author) return message.channel.send('Вы не можете себя обнять')
      let r = rn({
          min: 0,
          max: hug.length - 1,
          integer: true
      });
      let image = hug[r];
  
  let em11 = new Discord.RichEmbed()
  .setAuthor(message.author.username + " " +'обнимает' + " " + message.mentions.users.first().username + " " + '❤')
  .setImage(image)
  .setColor('RANDOM')
      message.channel.send(em11)
  };

  if(command === `${prefix}kiss`){
    const kiss = ["https://i.gifer.com/XkMW.gif","https://i.gifer.com/2QH8.gif","https://i.gifer.com/3h0f.gif","https://i.gifer.com/HgKr.gif","https://i.gifer.com/DCkU.gif","https://i.gifer.com/Jr4.gif","https://i.gifer.com/2uEt.gif"]
    const rn = require('random-number')
    
     if (!message.mentions.users.first()) return message.channel.send("Вы не можете поцеловать воздух...");
    if(message.mentions.users.first() === message.author) return message.channel.send('Вы не можете себя поцеловать')
        let r = rn({
            min: 0,
            max: kiss.length - 1,
            integer: true
        });
        let image = kiss[r];
    
    let em12 = new Discord.RichEmbed()
    .setAuthor(message.author.username + " " +'поцеловал' + " " + message.mentions.users.first().username + " " + '❤')
    .setImage(image)
    .setColor('RANDOM')
        message.channel.send(em12)
    };
  
  if(command === `${prefix}slap`){
    const slap = ["https://i.gifer.com/Ms5W.gif","https://i.gifer.com/ApIn.gif","https://i.gifer.com/AgVM.gif","https://i.gifer.com/OHNW.gif","https://i.gifer.com/8DpL.gif","https://i.gifer.com/74F.gif","https://i.gifer.com/Hfq4.gif","https://i.gifer.com/C6Of.gif","https://i.gifer.com/87hO.gif","https://i.gifer.com/DRv.gif","https://i.imgur.com/NcGUymg.gif"]
    const rn = require('random-number')
    
     if (!message.mentions.users.first()) return message.channel.send("Вы не можете ударить воздух...");
    if(message.mentions.users.first() === message.author) return message.channel.send('Вы не можете себя ударить')
        let r = rn({
            min: 0,
            max: slap.length - 1,
            integer: true
        });
        let image = slap[r];
    
    let em13 = new Discord.RichEmbed()
    .setAuthor(message.author.username + " " +'ударил' + " " + message.mentions.users.first().username + " ")
    .setImage(image)
    .setColor('RANDOM')
        message.channel.send(em13)
    };
  if(message.channel.type === 'dm') return
const weather = require('weather-js')
let cont = message.content.slice(prefix.length).split(" ")
if(message.content.startsWith(prefix+ 'weather')){
  
  weather.find({search: cont.slice(1).join(" "), degreeType: 'C'}, function(err,result){
    if(err) message.channel.send(err)
  var current = result[0].current;
var location = result[0].location;
const embed = new Discord.RichEmbed()
.setDescription(`${current.skytext}`)
.setAuthor(`Погода в ${current.observationpoint}`)
.setThumbnail(current.imageUrl)
.addField('Тайм зона',`UTC ${location.timezone}`,true)
.setColor('RANDOM')
.addField('Единица измерения', location.degreetype,true)
.addField('Температура',current.temperature,true)
.addField('Чувствуется как', current.feelslike,true)
.addField('Ветер',current.winddisplay,true)
.addField('Влажность',`${current.humidity}%`,true)
message.channel.send(embed)
  })
};
  
  if(message.content.startsWith(prefix + 'server-stats')){
message.guild.createChannel("Server Stats", "category").then(r=>{
message.guild.createChannel(`👦Пользователей: ${message.guild.members.size}`,'voice').then(m=>{
m.setParent(r.id)
m.replacePermissionOverwrites({
            overwrites: [
                {
                    id: message.guild.id,
                    deny: ['CONNECT'],
                }
            ],
        })
})
message.guild.createChannel(`🔧Ботов: ${message.guild.members.filter(l=>l.user.bot).size}`,'voice').then(m=>{
m.setParent(r.id)
m.replacePermissionOverwrites({
            overwrites: [
                {
                    id: message.guild.id,
                    deny: ['CONNECT'],
                }
            ],
        })
})
message.guild.createChannel(`👻Каналов: ${message.guild.channels.filter(cha =>cha.type === 'text').size+message.guild.channels.filter(cha =>cha.type === 'voice').size}`,'voice').then(m=>{
m.setParent(r.id)
m.replacePermissionOverwrites({
            overwrites: [
                {
                    id: message.guild.id,
                    deny: ['CONNECT'],
                }
            ],
        })
})
})

};
  
  
  
if(message.content === `${prefix}help`){
 let embed = new Discord.RichEmbed()
    .addField('Выберите категорию','**!help moderation - модерация\n!help fun - развлечение\n!help 18+ - [censored]\n!help other - прочее**')
    .setColor('RANDOM')
    .setThumbnail(bot.user.avatarURL)
    .setFooter('Команды бота || Ned#8110')
    message.channel.send(embed)
}if(args[0] === 'moderation'){
let embed = new Discord.RichEmbed()
.addField('MODERATION','**!kick [@name] [причина] - исключить пользователя\n!ban - выдать бан пользователю\n!mute [@name] [время(10s,10m,10h)] - выдать мут пользователю\n!unmute [@name] - размутить пользователя\n!warn [@name] [причина] - выдать пользователю предупреждение**')
.setColor('RANDOM')
.setThumbnail(bot.user.avatarURL)
.setFooter('Команды бота || Ned#8110')
message.channel.send(embed)
}if(args[0] === 'fun'){
    let embed = new Discord.RichEmbed()
    .addField('Развлечение','**!hug [@name] - обнять\n!kiss [@name] - поцеловать\n!slap [@name] - ударить**')
    .setColor('RANDOM')
    .setThumbnail(bot.user.avatarURL)
    .setFooter('Команды бота || Ned#8110')
    message.channel.send(embed)
    }if(args[0] === '18+'){
    let embed = new Discord.RichEmbed()
    .addField('18+','**!hentai\n!neko\n!pussy\n!trap\n!cum\n!kuni\n!anal**')
    .setColor('RANDOM')
    .setThumbnail(bot.user.avatarURL)
    .setFooter('Команды бота || Ned#8110')
    message.channel.send(embed)
    }if(args[0] === 'other'){
    let embed = new Discord.RichEmbed()
    .addField('Прочее','**!author - создатель бота\n!clear\n!osu [Ник в игре] - статистика в osu!standart\n!say [текст]\n!serverinfo - информация о сервере\n!weather [Город] - погода\n!server-stats - сгенерировать статистику о сервере\n!avatar [@name] - показать аватарку пользователя**')
    .setColor('RANDOM')
    .setThumbnail(bot.user.avatarURL)
    .setFooter('Команды бота || Ned#8110')
    message.channel.send(embed)
    };
  
if(command === `${prefix}botinfo`){
    function timeBotStarted(bot) {
        var uptimesec = bot.uptime / 1000;
        var uptimemin = bot.uptime / 60000;
        var uptimehour = bot.uptime / 3600000;
        if (uptimesec <= 60) {
            return ~~uptimesec + " сек."
        } else if (uptimemin <= 60) {
            return ~~uptimemin + " мин."
        } else if (uptimehour <= 24) {
            return ~~uptimehour + " ч."
        }
    };
    
    let emb = new Discord.RichEmbed()
    .setAuthor('Информация о боте')
    .addField('Серверов',bot.guilds.size)
    .addField('Каналов',bot.channels.size)
    .addField('Пинг',bot.ping)
    .addField('Используется количество памяти',Math.round(process.memoryUsage().rss / 1024 / 1024) + "MB")
    .addField("Время работы бота",timeBotStarted(bot))
    .setThumbnail(bot.user.avatarURL)
    message.channel.send(emb)
}; 
   if(message.content.startsWith(prefix + 'avatar')){
let user = message.mentions.members.first()
if(!user) return message.channel.send('Вы не указали пользователя')

bot.fetchUser(user.id).then(myUser => {
    let avatar = new Discord.RichEmbed()
.setFooter(`Аватар ${myUser.username}`)
.setImage(myUser.avatarURL)
message.channel.send(avatar)
});


};
  
  
if(command === `${prefix}cry`){
    const cry = ["https://gifer.com/ru/7JF","https://i.gifer.com/Iiuj.gif","https://i.gifer.com/53HC.gif","https://i.gifer.com/8bxB.gif","https://i.gifer.com/Zgp9.gif","https://i.gifer.com/8Z05.gif","https://i.gifer.com/PTEz.gif"]
    const rn = require('random-number')
    
     
    
        let r = rn({
            min: 0,
            max: cry.length - 1,
            integer: true
        });
        let image = cry[r];
    
    let em15 = new Discord.RichEmbed()
    .setAuthor(message.author.username + " " +'плачет')
    .setImage(image)
    .setColor('RANDOM')
        message.channel.send(em15)
    };
  
});




bot.on('message',async(message)=>{
if(message.content.startsWith(prefix + 'warn')){
let user = message.mentions.users.first()
if(!user) return message.channel.send('Вы не указали пользователя!')
const args = message.content.slice(prefix.lenght).split(' ')
const reason = args[2]
if(!reason) return message.channel.send('Вы не указали причину!')
message.channel.send(`Вы выдали варн пользователю ${user} по причине ${reason}`)
let warn = new Discord.RichEmbed()
.setTitle('Варн')
.setDescription(`Вам был выдан варн\n\nПользователем: **${message.author.username}**\n\nПо причине: **${reason}**`)
user.send(warn)
}  
if(message.content.startsWith(prefix + 'pussy')){
const superagent = require("superagent");
if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/pussy`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    
    .setImage(body.url);

  message.channel.send(catembed)

}

if(message.content.startsWith(prefix + 'neko')){
const superagent = require("superagent");
  if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/neko`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    
    .setImage(body.url);

  message.channel.send(catembed)
}
if(message.content.startsWith(prefix + 'hentai')){
const superagent = require("superagent");
  if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/Random_hentai_gif`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    
    .setImage(body.url);

  message.channel.send(catembed)
};


if(message.content.startsWith(prefix + 'trap')){
  const superagent = require("superagent");
  if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/trap`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    
    .setImage(body.url);

  message.channel.send(catembed)
};

 if(message.content.startsWith(prefix + 'kuni')){
   const superagent = require("superagent");
   if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/kuni`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    
    .setImage(body.url);

  message.channel.send(catembed)
 };
  
 if(message.content.startsWith(prefix + 'cum')){
   const superagent = require("superagent");
   if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/cum`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    
    .setImage(body.url);

  message.channel.send(catembed)
 };
  
 if(message.content.startsWith(prefix + 'anal')){
   const superagent = require ("superagent");
   if (!message.channel.nsfw) return message.reply('Only NSFW channel!')
  let {
    body
  } = await superagent
    .get(`https://nekos.life/api/v2/img/anal`);

  let catembed = new Discord.RichEmbed()
    .setColor("#FFCC5F")
    
    .setImage(body.url);

  message.channel.send(catembed)
 };
  

  
  
  
  
                              
})





bot.login(process.env.BOT_TOKEN);
