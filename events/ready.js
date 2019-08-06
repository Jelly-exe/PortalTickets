const config = require(`../config-files/main.json`);
const Discord = require(`discord.js`);
const client = new Discord.Client();
const log = require('leekslazylogger');
const delay = require('delay');

module.exports = async client => {

  client.user.setActivity(`for new tickets!`, { type: 'WATCHING' })

  log.info(`${client.users.keyArray().length} Users Online`);
  log.info(`${client.guilds.keyArray().length} Guilds`);

  const embed = new Discord.RichEmbed()
    .setTitle('Create a Ticket!')
    .setDescription('If you would like to order a service, then please select the appropriate reaction below. If none of them match then please select **Other**.')
    .addField('Services:', '<:Clyde:591341799596097548> - Bot Development\n\n<:discordSetup:591341192059420672> - Discord Setup\n\n<:minecraftSetup:591344194199748619> - Minecraft Setup\n\n<:graphicDesign:591345920415891482> - Graphic Design\n')
    .addField('Applications:', '.\n')
    .addField('Other:', '.')
    .setColor(0xFFA200)
    .setTimestamp()
    .setFooter('Portal Tickets')
    .setThumbnail('https://cdn.discordapp.com/icons/553868486460309525/47d91ef7cb1f5be38480483e2c3293a8.webp');

  var Achannel = client.channels.get('591318788180279299')

  var botDevelopment = Achannel.guild.emojis.find(x => x.name === 'botDevelopment');
  var discordSetup = Achannel.guild.emojis.find(x => x.name === 'discordSetup');
  var minecraftSetup = Achannel.guild.emojis.find(x => x.name === 'minecraftSetup');
  var graphicDesign = Achannel.guild.emojis.find(x => x.name === 'graphicDesign');

  var Achannel2 = client.channels.get('605521407304007727')

  Achannel2.fetchMessages()
    .then(function(list){
      Achannel2.bulkDelete(list)
    }, function(err){Achannel2.send("**Error:** Cannot Clear Channel.")})

  let Amessage = await Achannel2.send(embed)

  Amessage.react(botDevelopment);
  await delay(500);
  Amessage.react(discordSetup);
  await delay(500);
  Amessage.react(minecraftSetup);
  await delay(500);
  Amessage.react(graphicDesign);

  const collector = Amessage.createReactionCollector(reaction => reaction.emoji.name !== "");
  collector.on("collect", reaction => {

    if (reaction.message.channel.id == '605521407304007727') {

      let users = reaction.users.array();
      let reactor = users[users.length - 1];

      if(reactor.bot) return;
      reaction.remove(reactor);

      let depart = reaction.emoji.name;
      let depart2 = '';

      if (depart == 'botDevelopment') {
        depart2 = 'Bot Development'
      } else if (depart == 'discordSetup') {
        depart2 = 'Discord Setup'
      } else if (depart == 'minecraftSetup') {
        depart2 = 'Minecraft Setup'
      } else if (depart == 'graphicDesign') {
        depart2 = 'Graphic Design'
      }


      //create the ticket.

      Amessage.guild.createChannel(`ticket-${reactor.username}`).then(async c => {

        c.setParent('605521520198156320')

        const embed = new Discord.RichEmbed()
          .setTitle(`Thank you for choosing Portal Services ${reactor.username}!`)
          .setDescription(`You have choosen **${depart2}**.`)
          .addField('Your Order:', `It is now time for you to explain your order, please give us as much details as possible as this will allow us to post your commission much quicker. We will need the following details:\n\n• Description\n• Timeframe\n• Budget\n\nOnce you have posted these details, please tag the role <@&605160165825576962>.`)
          .setThumbnail('https://cdn.discordapp.com/icons/553868486460309525/47d91ef7cb1f5be38480483e2c3293a8.webp')
          .setColor(config.colour)
          .setTimestamp()
          .setFooter('Portal Tickets');
        c.send(embed)

        c.overwritePermissions(c.guild.defaultRole, {
          VIEW_CHANNEL: false,
          SEND_MESSAGES: false
        })

        c.overwritePermissions(reactor, {
          VIEW_CHANNEL: true,
          SEND_MESSAGES: true
        })

        });

        // c.overwritePermissions(supportrole, {
        //   VIEW_CHANNEL: true,
        //   SEND_MESSAGES: true
        // })
      }
  });
}
