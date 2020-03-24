const Discord = require('discord.js');
const ayarlar = require('../ayarlar.json');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
        .setAuthor(`${client.user.username} `, client.user.avatarURL)
        .setColor('RANDOM')
        .setTitle(`${client.user.username} - Komutlar`)
        .setDescription(`:white_small_square: | **${ayarlar.prefix}yetkili** Moderasyon Komutları.\n :white_small_square: | **${ayarlar.prefix}kullanıcı** Kullanıcıya Komutları.\n :white_small_square: |  **${ayarlar.prefix}eğlence** Eğlence Komutları.\n`)
        .setThumbnail(client.user.avatarURL)
        .setFooter(`${message.author.username} Tarafından İstendi.`, message.author.avatarURL)
    return message.channel.sendEmbed(embed);
  
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['help'],
  permLevel: 0,
};

exports.help = {
  name: 'yardım',
  description: '',
  usage: ''
};
   