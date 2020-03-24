const Discord = require('discord.js');

let botid = ('') //bu yere botun id'sini yapıştırın.
//eğer botunuz dbl(discord bot list) de yoksa Bota Oy Ver (Vote) olmucaktır.

exports.run = (client, message, args) => {
    const embed = new Discord.RichEmbed()
    .setColor("RANDOM")
    .setAuthor(`${client.user.username} Yetkili Komutları`)
    .addField(':white_small_square: !Slowmode', 'Chate yazı yazma hızını ayarlar.')
    .addField(':white_small_square: !Mute', 'Belirlenen kullanıcıyı susturur.')//ne kadar yetkili komutunuz varsa o kadar .addField('prefix+komut', 'açıklama/kullanım amacı') koyun
    .addField(':white_small_square: !Guard', 'Koruma komutlarını aktif eder.')
    .addField(':white_small_square: !Sil', 'Sohbeti siler.')
    message.channel.sendEmbed(embed);

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
};

exports.help = {
  name: 'yetkili',
  description: '',
  usage: ''
};
   