const {Client, Collection, MessageEmbed} = require("discord.js")
const client = new Client()

const {token} = require("./config.json")

client.on("ready", () => {
    console.log(`${client.user.tag} залогинился!`)
}).on("guildMemberAdd", async (member) => {
    const embed = new MessageEmbed()
    .setAuthor(`Участник зашёл.`)
    .setDescription(`Участник ${member.user.tag} зашел(а) на сервер.`)
    .setFooter(`By Fantom`);
    client.channels.cache.get("768496981944696842").send(embed)
}).on("guildMemberRemove", async (member) => {
    const embed = new MessageEmbed()
    .setAuthor(`Участник вышел.`)
    .setDescription(`Участник ${member.user.tag} вышел(а) с сервера.`)
    .setFooter(`By Fantom`);
    client.channels.cache.get("768496981944696842").send(embed)
}).on("messageDelete", message => {
    if (message.author.bot) return;
      const embed = new MessageEmbed()
        .setAuthor("Сообщение удалено")
        .addField("Отправитель", message.member, true)
        .addField("Канал", message.channel, true)
        .setFooter(`By Fantom`);
      if (message.content) {
        embed.addField("Содержание", message.content);
      }
      client.channels.cache.get("768496981944696842").send(embed)
    }).on("messageUpdate", (message, old, mes) => {
        if (message.author.bot) return;
        const embed = new MessageEmbed()
        .setAuthor('Сообщение обновлено')
        .setColor(color)
        .addField(`Автор сообщения:`, `${message.author}`,true)
        .addField(`Канал:`, `<#${message.channel.id}> (**${message.channel.id}**)`,true)
        .addField(`Сообщение ДО:`, `**${message.content}**`, true)
        .addField(`Сообщение ПОСЛЕ:`, `**${old.content}**`, true)
        .setFooter(`By Fantom`);
        client.channels.cache.get("768496981944696842").send(embed);
      })

client.login(token)
