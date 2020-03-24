const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Kullanıcı Komutları`)
    .addField(':white_small_square: T!Seviye', 'Seviyene bakarsın.')
    .addField(':white_small_square: T!Liderlik', 'Seviye liderlerine bakarsın.')//ne kadar yetkili komutunuz varsa o kadar .addField('prefix+komut', 'açıklama/kullanım amacı') koyun
    .addField(':white_small_square: T!Ping', 'Pingine bakarsın.')
    .addField(':white_small_square: T!Avatar', 'Avatarına bakarsın.')
    .addField(':white_small_square: T!Google', 'Google de Arama yaparsın.')
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'kullanıcı',
  description: '',
  usage: ''
};
   