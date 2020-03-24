const Discord = require('discord.js');
const request = require('node-superfetch');

const db = require('quick.db');

const { stripIndents } = require('common-tags');

exports.run = async (client, msg, args) => {
  const dil = db.fetch(`${msg.guild.id}.dil`)
  if (dil === 'en') {
  	const sorted = msg.guild.members.filter(m=>!m.user.bot).array().sort((a, b) => { return (db.fetch(`${b.user.id}.${msg.guild.id}.lvll`) || 0) - (db.fetch(`${a.user.id}.${msg.guild.id}.lvll`) || 0) });
	const top10 = sorted.splice(0, args[0] || 10)
  var sira = 1
  const map = top10.map(s=>`${sira++}. ${s.user.tag} \n# Level: ${db.fetch(`${s.user.id}.${msg.guild.id}.lvll`) || 0} | XP: ${db.fetch(`${s.user.id}.${msg.guild.id}.xpp`) || 0} / ${db.has(`${s.user.id}.${msg.guild.id}.lvll`) ? db.fetch(`${s.user.id}.${msg.guild.id}.lvll`) * 100 : 100}`.replace(msg.author.tag, `> ${msg.author.tag}`)).join('\n\n')
   
   msg.channel.send(`**${msg.guild.name} Server level ${args[0] || 10}  Users Leadership Ranking**`)
  msg.channel.send(stripIndents`
\`\`\`markdown
${map}
\`\`\`
   `)
  
  return
  }
	const sorted = msg.guild.members.filter(m=>!m.user.bot).array().sort((a, b) => { return (db.fetch(`${b.user.id}.${msg.guild.id}.lvll`) || 0) - (db.fetch(`${a.user.id}.${msg.guild.id}.lvll`) || 0) });
	const top10 = sorted.splice(0, args[0] || 10)
  var sira = 1
  const map = top10.map(s=>`${sira++}. ${s.user.tag} \n# Seviye: ${db.fetch(`${s.user.id}.${msg.guild.id}.lvll`) || 0} | XP: ${db.fetch(`${s.user.id}.${msg.guild.id}.xpp`) || 0} / ${db.has(`${s.user.id}.${msg.guild.id}.lvll`) ? db.fetch(`${s.user.id}.${msg.guild.id}.lvll`) * 100 : 100}`.replace(msg.author.tag, `> ${msg.author.tag}`)).join('\n\n')
   
   msg.channel.send(`**${msg.guild.name} Sunucusu Seviye ${args[0] || 10}  Kişilik Liderlik Sıralaması**`)
  msg.channel.send(stripIndents`
\`\`\`markdown
${map}
\`\`\`
   `)
  
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ["leaderboard", "leadership"],
  permLevel: 0,
    kategori: "lvl"
};

exports.help = {
  name: 'liderlik',
  description: 'Seviye sisteminin sunucudaki liderlik tablosunu gösterir.',
  usage: ''
};