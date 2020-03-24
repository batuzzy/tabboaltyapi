

1
2
3
4
5
6
7
8
9
10
11
12
13
14
15
16
17
18
19
20
21
22
23
24
25
26
27
28
29
30
31
32
33
34
35
36
37
38
39
40
41
42
43
44
45
46
47
48
49
50
51
52
53
54
55
56
57
58
59
60
61
62
63
64
65
66
67
const Discord = require("discord.js");
const ms = require("ms");
const client = new Discord.Client();

exports.run = async (receivedMessage, msg, args) => {
     if (!msg.member.hasPermissions("KICK_MEMBERS")) return msg.channel.send("Yetkiye Sahip Değilsin")
var mod = msg.author
	let reason = args.join(" ").slice(25);
let user = msg.guild.member(msg.mentions.users.first() || msg.guild.members.get(args[0]));
  if (!user) return msg.reply('Kullanıcı Etiketlemedin')
  if (!reason) return msg.reply('sebep Belirtmedin')
  let mute = msg.guild.roles.find(r => r.name === "Susturuldu");
          
  let mutetime = args[1];
if(!mute){
      mute = await msg.guild.createRole({
        name: "Susturuldu",
        color: "#818386",
        permissions:[]
      })
      msg.guild.channels.forEach(async (channel, id) => {
        await channel.overwritePermissions(mute, {
          SEND_MESSAGES: false,
          ADD_REACTIONS: false
        });
      });
  
    }
  
  
  await(user.addRole(mute.id));
  let mutezaman = args[1]
.replace(`d`," Gün")
.replace(`s`," Saniye")
.replace(`h`," Saat")
.replace(`m`," Dakika")
.replace(`w`," Hafta")
  

  const muteembed = new Discord.RichEmbed()
     	.setTitle('Ceza: Süreli Mute')
      .addField('Moderatör', `${mod}`,true)
      .addField('Sebep', `${reason}`,true)
      .addField('Kullanıcı', `<@${user.id}>`,true)
      .addField('Süre',`${mutezaman}`)
	msg.channel.send(muteembed);
  setTimeout(function(){
    // msg.channel.send(`<@${user.id}> Muten açıldı.`)
      const muteembed = new Discord.RichEmbed()
      .setDescription(`<@${user.id}> Muten açıldı.`)
        msg.channel.send(muteembed)
    user.removeRole(mute.id);
  }, ms(mutetime));

}
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ["mute"],
  permLevel: 0
};

exports.help = {
  name: "mute",
  description: "Belirttiğin kişiyi muteler",
  usage: ""
};