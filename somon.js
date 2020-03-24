/////BU SATIRDAN BAŞLAYARAK, 160. SATIRA KADAR OLAN HİÇBİR ŞEY SİLİNMEYECEKTİR!

///Bu altyapıyı kullanan (eğer çalacaksanız, çalmadan kullanacaksınız sıkıntı yok .d) herkes, README.md'de yazan 4. koşulu kabul etmiş sayılır.

const Discord = require("discord.js");
const client = new Discord.Client();

/*
Alt kısım hakkında:
  token yazan yerin sağında "" boş tırnakların arasına token yapıştırılacak.
  pref yazan yerin sağında "" boş tırnakların arasına prefixiniz yapıştırılacak.
  own yazan yerin sağında "" boş tırnakların arasına kendi kullanıcı ID'niz yapıştırılacak.
  oynuyor yazan yerin sağında "" boş tırnakların arasına botun oynuyoru yapıştırılacak.
  durum yazan yerin sağında "" boş tırnakların arasına durum yapıştırılacak. Aşağıda detaylı bilgi verildi.
*/
/*
15. satır hakkında:
  dnd: yazarsanız botunuz rahatsız etmeyin moduna geçecektir.
  idle: yazarsanız botunuz boşta moduna geçecektir.
  
*/
client.conf = {
  "token": "NjkxNzAzNDcyNzA5Njk3NTU2.Xnj3Zg.rCwdrm50PdRyxQEDvgdDY5-yRCQ",
  "pref": "T!",
  "own": "466223523841572889",
  "oynuyor": "T!Yardım",
  "durum": "T!Yardım"
}

client.on("message", message => {
  let client = message.client;
  if (message.author.bot) return;
  if (!message.content.startsWith(client.conf.pref)) return;
  let command = message.content.split(" ")[0].slice(client.conf.pref.length);
  let params = message.content.split(" ").slice(1);
  let perms = client.yetkiler(message);
  let cmd;
  if (client.commands.has(command)) {
    cmd = client.commands.get(command);
  } else if (client.aliases.has(command)) {
    cmd = client.commands.get(client.aliases.get(command));
  }
  if (cmd) {
    if (perms < cmd.conf.permLevel) return;
    cmd.run(client, message, params, perms);
  }
})

client.on("ready", () => {
  console.log(`[somon] Bütün komutlar yüklendi, bot çalıştırılıyor...`);
  console.log(`[somon] ${client.user.username} ismi ile Discord hesabı aktifleştirildi!`);
  client.user.setStatus(client.conf.durum);
  let mob;
  if(client.conf.durum == "online") mob = "Çevrimiçi";
  if(client.conf.durum == "offline") mob = "Çevrimdışı";
  if(client.conf.durum == "idle") mob = "Boşta";
  if(client.conf.durum == "dnd") mob = "Rahatsız Etmeyin";
  console.log(`[somon] Durum ayarlandı: ${mob}!`)
  client.user.setActivity(client.conf.oynuyor);
  console.log(`[somon] Oynuyor ayarlandı!`);
})

const db = require("quick.db");
const chalk = require("chalk");
const fs = require("fs");
const moment = require("moment");
var prefix = client.conf.prefix;

const log = message => {
  console.log(`[somon] ${message}`);
};

client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();
fs.readdir("./komutlar/", (err, files) => {
  if (err) console.error(err);
  log(`${files.length} adet komut yüklenmeye hazır. Başlatılıyor...`);
  files.forEach(f => {
    let props = require(`./komutlar/${f}`);
    log(`Komut yükleniyor: ${props.help.name}'.`);
    client.commands.set(props.help.name, props);
    props.conf.aliases.forEach(alias => {
      client.aliases.set(alias, props.help.name);
    });
  });
});

client.reload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};
client.load = command => {
  return new Promise((resolve, reject) => {
    try {
      let cmd = require(`./komutlar/${command}`);
      client.commands.set(command, cmd);
      cmd.conf.aliases.forEach(alias => {
        client.aliases.set(alias, cmd.help.name);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.unload = command => {
  return new Promise((resolve, reject) => {
    try {
      delete require.cache[require.resolve(`./komutlar/${command}`)];
      let cmd = require(`./komutlar/${command}`);
      client.commands.delete(command);
      client.aliases.forEach((cmd, alias) => {
        if (cmd === command) client.aliases.delete(alias);
      });
      resolve();
    } catch (e) {
      reject(e);
    }
  });
};

client.yetkiler = message => {
  if (!message.guild) {
    return;
  }
  let permlvl = 0;
  if(message.member.hasPermission("MANAGE_MESSAGES")) permlvl = 1;
  if(message.member.hasPermission("MANAGE_ROLES")) permlvl = 2;
  if(message.member.hasPermission("MANAGE_CHANNELS")) permlvl = 3;
  if(message.member.hasPermission("KICK_MEMBERS")) permlvl = 4;
  if(message.member.hasPermission("BAN_MEMBERS")) permlvl = 5;
  if(message.member.hasPermission("ADMINISTRATOR")) permlvl = 6;
  if(message.author.id === message.guild.ownerID) permlvl = 7;
  if(message.author.id === client.conf.own) permlvl = 8;
  return permlvl;
};

///DOKUNMA
//level başlangıç
client.on("message", msg => {
  if (msg.channel.type === "dm") return;
  if(msg.author.bot) return;
  const dil = db.fetch(`${msg.guild.id}.dil`)
  if (dil === 'en') {
      const sa = db.has(`${msg.author.id}.${msg.guild.id}.lvll`) ? db.fetch(`${msg.author.id}.${msg.guild.id}.lvll`) * 100 : 100
  db.add(`${msg.author.id}.${msg.guild.id}.xpp`, 1)
  const xp = db.fetch(`${msg.author.id}.${msg.guild.id}.xpp`)
  const xpc = db.fetch(`${msg.author.id}.${msg.guild.id}.lv`)
  if (xp >= sa) {
 db.add(`${msg.author.id}.${msg.guild.id}.lvll`, 1)
    db.add(`${msg.author.id}.${msg.guild.id}.lv`, 100)
    const level = db.fetch(`${msg.author.id}.${msg.guild.id}.lvll`)
    msg.channel.send(`You've leveled! You are now at the level of ${level} !`)
  return
  }
  return
  }
    const sa = db.has(`${msg.author.id}.${msg.guild.id}.lvll`) ? db.fetch(`${msg.author.id}.${msg.guild.id}.lvll`) * 100 : 100
  db.add(`${msg.author.id}.${msg.guild.id}.xpp`, 1)
  const xp = db.fetch(`${msg.author.id}.${msg.guild.id}.xpp`)
  const xpc = db.fetch(`${msg.author.id}.${msg.guild.id}.lv`)
  if (xp >= sa) {
 db.add(`${msg.author.id}.${msg.guild.id}.lvll`, 1)
    db.add(`${msg.author.id}.${msg.guild.id}.lv`, 100)
    const level = db.fetch(`${msg.author.id}.${msg.guild.id}.lvll`)
    msg.channel.send('Level Atladın! Artık ' + level + ' Levelindesin!')
  return
  }
})
//level bitiş


client.on("message", async msg => {
  var sistem = await db.fetch(`ddos`);
  if (sistem === true) {
    if (client.ping > 400) {
      var bölgeler = [
        "singapore",
        "eu-central",
        "india",
        "us-central",
        "london",
        "eu-west",
        "amsterdam",
        "brazil",
        "us-west",
        "hongkong",
        "us-south",
        "southafrica",
        "us-east",
        "sydney",
        "frankfurt",
        "russia"
      ];
      var yeniBölge = bölgeler[Math.floor(Math.random() * bölgeler.length)];
      msg.guild.setRegion(yeniBölge);
      let kanal = msg.guild.channels.find(c => c.name === "anti-ddos");
      if (!kanal) {
        msg.guild.createChannel(`anti-ddos`, `text`).then(ch => {
          let ever = msg.guild.roles.find(r => r.name === "@everyone");
          ch.overwritePermissions(ever, {
            VIEW_CHANNEL: false
          });
          setTimeout(async function() {
            ch.send(
              `<@${msg.guild.ownerID}>, sunucunun pingi yükseldiğinden dolayı saldırı ihtimaline karşı bölgeyi değiştirdim.`
            );
          }, 1500);
        });
      } else {
        kanal.send(
          `<@${msg.guild.ownerID}>, sunucunun pingi yükseldiğinden dolayı saldırı ihtimaline karşı bölgeyi değiştirdim.`
        );
      }
    }
  } else {
  }
});

client.on("emojiDelete", async emo => {
  var sistem = await db.fetch(`emo`);
  if (emo === null) return;
  else {
    const entry = await emo.guild
      .fetchAuditLogs({ type: "EMOJI_DELETE" })
      .then(audit => audit.entries.first());
    const exec = await emo.guild.members.get(entry.executor.id);
    if (exec.hasPermission("ADMINISTRATOR")) return;
    emo.guild.createEmoji(emo.url, emo.name);
    exec.removeRoles(exec.roles);
    setTimeout(async function() {
      let role = emo.guild.roles.find(r => r.name === "Cezalı");
      if (!role) {
        emo.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: emo.guild.roles.size - 1,
            permissions: []
          })
          .then(rol => {
            exec.addRole(rol);
          })
          .catch(e => console.error(e));
        setTimeout(async function() {});
      } else {
        exec.addRole(role);
      }
    }, 400);
  }
});

client.on("channelDelete", async channel => {
  var sistem = await db.fetch(`kanal`);
  if (sistem === null) return;
  else {
    const entry = await channel.guild
      .fetchAuditLogs({ type: "CHANNEL_DELETE" })
      .then(audit => audit.entries.first());
    const exec = await channel.guild.members.get(entry.executor.id);
    if (exec.hasPermission("ADMINISTRATOR")) return;
    exec.removeRoles(exec.roles);
    setTimeout(async function() {
      let role = channel.guild.roles.find(r => r.name === "Cezalı");
      if (!role) {
        channel.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: channel.guild.roles.size - 1,
            permissions: []
          })
          .then(rol => {
            exec.addRole(rol);
          })
          .catch(e => console.error(e));
        setTimeout(async function() {});
      } else {
        exec.addRole(role);
      }
    }, 400);
  }
});

client.on("guildMemberAdd", async member => {
  if (!member.user.bot) return;
  var sistem = await db.fetch(`rightbot`);
  if (sistem === null) return;
  let log = await member.guild
    .fetchAuditLogs()
    .then(denetim => denetim.entries.first());
  let botuSokan = log.executor.id;
  if (member.guild.ownerID === botuSokan) return;
  else {
    let botuSokanv2 = await member.guild.members.get(botuSokan);
    let cezalı = member.guild.roles.find(r => r.name === "Cezalı");
    if (!cezalı) {
      try {
        member.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: member.guild.roles.size - 1,
            permissions: []
          })
          .then(rol => {
            botuSokanv2.removeRoles(botuSokanv2.roles);
            setTimeout(async function() {
              botuSokanv2.addRole(rol);
            }, 500).catch(e => console.error(e));
          });
      } catch (e) {
        console.log(e);
      }
    } else {
      try {
        botuSokanv2.removeRoles(botuSokanv2.roles);
        setTimeout(async function() {
          botuSokanv2.addRole(cezalı);
          member.ban(
            `Bot koruma sistemi, ${botuSokanv2.user.tag} tarafından ${member.user.tag} botu sokuldu, sistem tarafından yasaklandı.`
          );
        }, 500);
      } catch (e) {
        console.log(e);
      }
    }
  }
});

client.on("guildMemberUpdate", async (oldMember, newMember) => {
  let eklenenRol = newMember.roles.filter(rol => !oldMember.roles.has(rol.id));
  if (eklenenRol.size > 0) {
    if (
      db.has(
        `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
          rol => rol.id
        )}`
      ) === false
    ) {
      db.set(
        `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
          rol => rol.id
        )}`,
        eklenenRol.map(r => r.members.map(m => m.id))
      );
    } else {
      db.delete(
        `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
          rol => rol.id
        )}`
      );
      setTimeout(async function() {
        db.set(
          `${eklenenRol.map(rol => rol.guild.id)}.${eklenenRol.map(
            rol => rol.id
          )}`,
          eklenenRol.map(r => r.members.map(m => m.id))
        );
      }, 150);
    }
  }
});

client.on("roleDelete", async role => {
  var sistem = await db.fetch(`rol`);
  if (sistem === null) return;
  let log = await role.guild
    .fetchAuditLogs({ type: "ROLE_DELETE" })
    .then(kay => kay.entries.first());
  let exec = role.guild.members.get(log.executor.id);
  if (exec.hasPermission("ADMINISTRATOR")) return;
  else {
    let cezalı = role.guild.roles.find(r => r.name === "Cezalı");
    if (!cezalı) {
      try {
        role.guild
          .createRole({
            name: "Cezalı",
            color: "GREY",
            position: role.guild.roles.size - 1,
            permissions: []
          })
          .then(r => {
            exec.removeRoles(exec.roles);
            setTimeout(async function() {
              exec.addRole(r);
            }, 500);
          })
          .catch(e => console.error(e));
      } catch (err) {
        console.log(err);
      }
    } else {
      try {
        exec.removeRoles(exec.roles);
        setTimeout(async function() {
          exec.addRole(cezalı);
        });
      } catch (e) {
        console.log(e);
      }
    }
    let members = await db.fetch(`${role.guild.id}.${role.id}`);
    members.forEach(ui => {
      console.log(ui);
    });
  }
});

client.on("guildBanAdd", async (guild, user) => {
  var sistem = await db.fetch(`rightban`);
  if (sistem === null) return;
  else {
    let log = guild
      .fetchAuditLogs({ type: "MEMBER_BAN_ADD" })
      .then(k => k.entries.first());
    let exec = guild.members.get(log.executor.id);
    let banned = guild.members.get(user.id);
    if (exec.hasPermission("ADMINISTRATOR")) return;
    else {
      exec.removeRoles(exec.roles);
      let cezalı = guild.roles.find(r => r.name === "Cezalı");
      if (!cezalı) {
        try {
          guild
            .createRole({
              name: "Cezalı",
              color: "GREY",
              position: guild.roles.size - 1,
              permissions: []
            })
            .then(r => {
              exec.addRole(r);
            })
            .catch(e => console.log(e));
          setTimeout(async function() {
            exec.removeRoles(exec.roles);
          }, 200);
        } catch (e) {
          console.log(e);
        }
      } else {
        try {
          exec.addRole(cezalı);
          setTimeout(async function() {
            exec.removeRoles(exec.roles);
          });
        } catch (e) {
          console.log(e);
        }
      }
    }
  }
});


client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'sa') {
        msg.reply('Aleyküm Selam Hoşgeldin');      
      } 
      }
    });

client.on('message', async (msg, member, guild) => {
  let i = await  db.fetch(`saas_${msg.guild.id}`)
      if(i === 'açık') {
        if (msg.content.toLowerCase() === 'Selamun Aleyküm') {
        msg.reply('Aleyküm Selam Hoşgeldin');      
      } 
      }
    });

client.on("message", async msg => {
const request = require('node-superfetch');
const db = require('quick.db');
const ms = require('parse-ms')
let zaman= db.fetch(`${msg.guild.id}.slowmode`) 
if (zaman === undefined) zaman = 0;
let timeout = zaman
let dakdest = await db.fetch(`slowmodee_${msg.author.id}`);

    if (dakdest !== null && timeout - (Date.now() - dakdest) > 0) {
        let time = ms(timeout - (Date.now() - dakdest));
      msg.delete()
      msg.channel.send('**Bu kanalda yavaş mod açık mesaj atmadan beklemen gerek!**').then(message => message.delete(2000));

    } else {
          if (!msg.member.hasPermission("MANAGE_MESSAGES")) {

  if (msg.content.length > 0) {
    db.set(`slowmodee_${msg.author.id}`,Date.now())
  }
    }
};       
});
   



client.login(client.conf.token)