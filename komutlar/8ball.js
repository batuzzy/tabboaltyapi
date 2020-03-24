
const Discord = require('discord.js');

const cevaplar = [
    "Evet :upside_down: ",
    "Hayır :neutral_face: ",
    "Belki :confused: ",
    "Olabilir :zany_face: ",
    "Daha sonra tekrar sor :face_with_raised_eyebrow: ",
    "imkansız :astonished: ",
    "TaBBo Bot bunu cevaplayamaz :sunglasses: ",
    "Anlamadım :face_with_monocle: ",
    "Sorun yanlış :nerd: ",
    "Kesinlikle :smile: ",
    "Sen nediyorsun lan değişik :angry:"
];

exports.run = function(client, message, args) {
    var soru = args.join(' ');

    var cevap = cevaplar[Math.floor(Math.random() * cevaplar.length)];

    if(!soru) return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setAuthor('Hata').setDescription('Soru Giriniz'))
    else return message.channel.sendEmbed(new Discord.RichEmbed().setColor('RANDOM').setDescription(cevap).setAuthor('Cevap:'))

};  

exports.conf = {
  enabled: true, 
  guildOnly: true, 
  aliases: [],
  permLevel: 0 
};

exports.help = {
  name: '8ball', 
  description: 'Sorduğunuz Soruya Rastgele Cevap Verir.',
  usage: '8ball [soru]'
};