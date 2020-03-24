const Discord = require('discord.js');
const db = require('quick.db');
const fs = require('fs');

exports.run = async (client, message, args, member) => {
  if (!message.member.hasPermission("ADMINISTRATOR")) return message.reply(`Bu komutu kullanabilmek için **Yönetici** iznine sahip olmalısın!`);
  if (args[0] === 'liste') {
        let e = new Discord.RichEmbed()
        .setTitle(client.user.username + ' | Dil Sistemi')
      .setDescription('tr(Türkçe) tr Dilini Seçmek İçin `svo!dil tr`\nen(English) Dilini Seçmek İçin `svo!dil en`')
        .setFooter(client.user.username + ' | Dil Sistemi', client.user.avatarURL)
      .setColor("#cfc9c9")
        message.channel.send(e)
  return
  }
  if (!args[0]) return message.channel.send('Lütfen Lütfen Bi Dil Seçiniz\nDileri Görmek İçin svo!dil liste')
if (args[0] === 'tr' || args[0] === 'türkçe') {
        let e = new Discord.RichEmbed()
      .setDescription('Dil Başarılı Şekilde tr(Türkçe) Ayarlandı!')
      .setColor("#cfc9c9")
        message.channel.send(e)
 db.set(`${message.guild.id}.dil`, 'tr')
  message.guild.members.get(client.user.id).setNickname(client.user.username)
return
}
  
  if (args[0] === 'en' || args[0] === 'english') {
        let e = new Discord.RichEmbed()
      .setDescription('Language set en(English)!')
      .setColor("#cfc9c9")
message.channel.send(e)
     db.set(`${message.guild.id}.dil`, 'en')
return
}
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0,
 };
 
 exports.help = {
 name: 'dil',
 description: 'Avatarınızı veya etiketlediğiniz kişinin avatarını atar.',
 usage: '/avatar [@Kişi]'
 }