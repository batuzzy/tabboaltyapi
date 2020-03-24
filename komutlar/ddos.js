
//new Discord.RichEmbed().setColor("RED").setDescription(`Komutun kullanımını bilmiyorsanız lütfen **${prefix}guard yardım** yazarak yardım alabilirsiniz.`).setFooter(msg.author.tag, msg.author.displayAvatarURL)

const Discord = require("discord.js");
const db = require("quick.db");
const ayarlar = require('../somon.js');
var prefix = ayarlar.prefix;
exports.run = async (client, msg, args) => {
  if(args[0] === "yardım") {
    msg.channel.send(new Discord.RichEmbed().setTitle("Koruma kodları yardımı").setDescription(`**DDOS**: ${prefix}guard ddos aç/kapat\n**Emoji**: ${prefix}guard emoji aç/kapat\n**Kanal**: ${prefix}guard kanal aç/kapat\n**Rol**: ${prefix}guard rol aç/kapat\n**Bot**: ${prefix}guard bot aç/kapat\n**Ban**: ${prefix}guard sağ-tık-ban aç/kapat\n**Kick**: ${prefix}guard sağ-tık-kick aç/kapat\n`).setFooter(msg.author.tag, msg.author.displayAvatarURL).setColor("RANDOM"))
  } else if(args[0] === "ddos") {
    let sistem = await db.fetch(`ddos`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`ddos`, true)
      msg.channel.send(new Discord.RichEmbed().setColor("GREEN").setDescription(`DDOS koruma sistemi açıldı!`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(`DDOS koruma sistemi hâlihazırda kapalı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`ddos`)
      }
    }
  } else if(args[0] === "emoji") {
    let sistem = await db.fetch(`emo`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`emo`, true)
      msg.channel.send(new Discord.RichEmbed().setColor("GREEN").setDescription(`Emoji koruma sistemi açıldı!`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(`Emoji koruma sistemi hâlihazırda kapalı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`emo`)
      }
    }
  } else if(args[0] === "kanal") {
    let sistem = await db.fetch(`kanal`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`kanal`, true)
      msg.channel.send(new Discord.RichEmbed().setColor("GREEN").setDescription(`Kanal koruma sistemi açıldı!`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(`Kanal koruma sistemi hâlihazırda kapalı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`kanal`)
      }
    }
  } else if(args[0] === "rol") {
    let sistem = await db.fetch(`rol`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`rol`, true)
      msg.channel.send(new Discord.RichEmbed().setColor("GREEN").setDescription(`Rol koruma sistemi açıldı!`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(`Rol koruma sistemi hâlihazırda kapalı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`rol`)
      }
    }
  } else if(args[0] === "bot") {
    let sistem = await db.fetch(`rightbot`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`rightbot`, true)
      msg.channel.send(new Discord.RichEmbed().setColor("GREEN").setDescription(`Bot koruma sistemi açıldı!`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(`Bot koruma sistemi hâlihazırda kapalı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`rightbot`)
      }
    }
  } else if(args[0] === "sağ-tık-ban") {
    let sistem = await db.fetch(`rightban`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`rightban`, true)
      msg.channel.send(new Discord.RichEmbed().setColor("GREEN").setDescription(`Sağ tık ban sistemi açıldı!`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(`Sağ tık ban sistemi hâlihazırda kapalı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`rightban`)
      }
    }
  } else if(args[0] === "sağ-tık-kick") {
    let sistem = await db.fetch(`rightkick`)
    let ayar = args[1]
    if(ayar === "aç") {
      db.set(`rightkick`, true)
      msg.channel.send(new Discord.RichEmbed().setColor("GREEN").setDescription(`Sağ tık kick sistemi açıldı!`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
    } else if(ayar === "kapat") {
      if(sistem === null) {
        msg.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(`Sağ tık kick sistemi hâlihazırda kapalı.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
      } else {
        db.delete(`rightkick`)
      }
    }
  } else if(!args[0]) {
    msg.channel.send(new Discord.RichEmbed().setColor("RED").setDescription(`Komutun kullanımını bilmiyorsanız lütfen **${prefix}guard yardım** yazarak yardım alabilirsiniz.`).setFooter(msg.author.tag, msg.author.displayAvatarURL))
  }
}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["koruma"],
  permLevel: 4
};

exports.help = {
  name: "guard"
};