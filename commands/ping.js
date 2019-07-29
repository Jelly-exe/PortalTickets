const Discord = require("discord.js");
const config = require("../config-files/main.json");
const colour = config.colour;

exports.run = async (client, message, args) => {
    message.delete();
    message.channel.startTyping();
    const m = await message.channel.send("Calculating...");
    m.edit("...")
    m.delete()
    const embed = new Discord.RichEmbed()
      .setTitle("Pong!")
      .setColor(config.colour)
      .setDescription("`-------------------------------------`")
      .addField("Bot Latency", `${m.createdTimestamp - message.createdTimestamp}ms`, true)
      .addField("API Latency", `${Math.round(message.client.ping)}ms`, true)
      .setTimestamp()
      .setFooter(`Portal Ticket`, 'https://imgur.com/a/ZXeqEyG');
      message.channel.stopTyping();
    message.channel.send({embed})
  }
module.exports.config = {
  name: "ping",
  aliases: ["howfastisbotworking"]
}