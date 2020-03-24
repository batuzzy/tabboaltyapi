const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Eğlence Komutları`)
    .addField(':white_small_square: T!Stresçarkı', 'Stresçarkı döndürür.')
    .addField(':white_small_square: T!Slot', 'Slot Oynarsın.')//ne kadar yetkili komutunuz varsa o kadar .addField('prefix+komut', 'açıklama/kullanım amacı') koyun
    .addField(':white_small_square: T!Yazi-tura', 'Yazı Tura Oynarsın.')
    .addField(':white_small_square: T!Kaçcm', 'Malafat boyutun çıkar :).')
    .addField(':white_small_square: T!Efkarölcer', 'Efkarını ölçersin.')
    .addField(':white_small_square: T!8Ball (SORU)', 'Soru sorarsın.')
    .addField(':white_small_square: T!Fbi-gif', 'Rastgele fbi gif atar.')
    .addField(':white_small_square: T!Duello', 'Etiketledigin kişiyle duel atarsın.')
    .addField(':white_small_square: T!Espri', 'Bot espri yapar.')
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'eğlence',
  description: '',
  usage: ''
};
   