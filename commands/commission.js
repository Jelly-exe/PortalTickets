const Discord = require("discord.js");
const fs = require("fs");
const delay = require('delay');

const config = require("../config-files/main.json");

module.exports.run = async (client, message, args) => {

  const ended = new Discord.RichEmbed()
  .setDescription(':x: Commission creationed timed out!')
  .setColor(config.colour);

  const ended2 = new Discord.RichEmbed()
  .setDescription(':x: Role not found!')
  .setColor(config.colour);

  message.delete();
  const embed = new Discord.RichEmbed()
      .setTitle('Commission Creation System')
      .setDescription('Please use the instuctions below to create the commission:\n\n**What role should be pinged for the commission?**')
      .setColor(config.colour);
  const c = await message.channel.send(embed);

  await delay(500);
  message.channel.awaitMessages(message => message.content !== '', { maxMatches: 1, time: 30000, errors: ['time'] })
  .then(collected => {
    let role = message.channel.guild.roles.find(x => x.name == collected.first().content);

    const embed22 = new Discord.RichEmbed()
      .setTitle('Commission Creation System')
      .setDescription('Please use the instuctions below to create the commission:\n\n**Please provide a __title__ for the commission.**\n\n')
      .addField('Commission:', `__Role:__ ${role.name}`)
      .setColor(config.colour);

    c.edit(embed22);
    message.channel.awaitMessages(message => message.content !== '', { maxMatches: 1, time: 30000, errors: ['time'] })
    .then(collected => {
      let title = collected.first().content;

      const embed2 = new Discord.RichEmbed()
        .setTitle('Commission Creation System')
        .setDescription('Please use the instuctions below to create the commission:\n\n**Please provide a __description__ for the commission.**\n\n')
        .addField('Commission:', `__Role:__${role.name}\n__Title:__ ${title}`)
        .setColor(config.colour);

      c.edit(embed2);

      message.channel.awaitMessages(message => message.content !== '', { maxMatches: 1, time: 30000, errors: ['time'] })
      .then(collected => {
          const description = collected.first().content;

          const embed3 = new Discord.RichEmbed()
            .setTitle('Commission Creation System')
            .setDescription('Please use the instuctions below to create the commission:\n\n**Please provide a __timeframe__ for the commission.**\n\n')
            .addField('Commission:', `__Role:__ ${role.name}\n__Title:__ ${title}\n__Description:__ ${description}`)
            .setColor(config.colour);

          c.edit(embed3);

          message.channel.awaitMessages(message => message.content !== '', { maxMatches: 1, time: 30000, errors: ['time'] })
            .then(collected => {
                const timeframe = collected.first().content;

                const embed4 = new Discord.RichEmbed()
                  .setTitle('Commission Creation System')
                  .setDescription('Please use the instuctions below to create the commission:\n\n**Please provide a __budget__ for the commission.**\n\n')
                  .addField('Commission:', `__Role:__ ${role.name}\n__Title:__ ${title}\n__Description:__ ${description}\n__Timeframe:__ ${timeframe}`)
                  .setColor(config.colour);

                c.edit(embed4);
                let role2 = role;
                message.channel.awaitMessages(message => message.content !== '', { maxMatches: 1, time: 30000, errors: ['time'] })
                  .then(collected => {
                      const budget = collected.first().content;

                      const embed44 = new Discord.RichEmbed()
                        .setTitle('Commission Creation System')
                        .setDescription('Please use the instuctions below to create the commission:\n\n**Are there any extra details?**\n\n')
                        .addField('Commission:', `__Role:__ ${role2.name}\n__Title:__ ${title}\n__Description:__ ${description}\n__Timeframe:__ ${timeframe}\n__Budget:__ ${budget}`)
                        .setColor(config.colour);

                      c.edit(embed44);

                      message.channel.awaitMessages(message => message.content !== '', { maxMatches: 1, time: 30000, errors: ['time'] })
                        .then(async (collected) => {

                            const details = collected.first().content;

                            const embed5 = new Discord.RichEmbed()
                              .setTitle('Commission Creation System')
                              .setDescription('Please use the instuctions below to create the commission:\n\n**Please let the client react below to confirm, once the client reacts the commission will be posted.**\n\n')
                              .addField('Commission:', `__Role:__ ${role2.name}\n__Title:__ ${title}\n__Description:__ ${description}\n__Timeframe:__ ${timeframe}\n__Budget:__ ${budget}\n__Any extra details?__ ${details}`)
                              .setColor(config.colour);

                            const embed6 = new Discord.RichEmbed()
                              .setTitle('Commission Creation System')
                              .setDescription('** **\n<a:tick:606612530378571776> **Commission Posted!**\n\n** **')
                              .addField('Commission:', `__Role:__ ${role2.name}\n__Title:__ ${title}\n__Description:__ ${description}\n__Timeframe:__ ${timeframe}\n__Budget:__ ${budget}\n__Any extra details?__ ${details}`)
                              .setColor(config.colour);

                            const embed7 = new Discord.RichEmbed()
                              .setTitle('Commission Creation System')
                              .setDescription('** **\n<a:cross:606618471786217485> **Client denied has denied the commission, a member of the Support Team will be with you shortly to seek out why.**\n\n** **')
                              .addField('Commission:', `__Role:__ ${role2.name}\n__Title:__ ${title}\n__Description:__ ${description}\n__Timeframe:__ ${timeframe}\n__Budget:__ ${budget}\n__Any extra details?__ ${details}`)
                              .setColor(config.colour);

                            c.edit(embed5);

                            c.react('✅');
                            await delay(100);
                            c.react('❌');


                            const filter = (reaction, user) => {
                              return user.id == message.author.id && !user.bot &&(reaction.emoji.name === '✅' || reaction.emoji.name === '❌');
                            };

                            const collector = c.createReactionCollector(filter, { maxMatches: 1, time: 86400000 });

                            collector.on('collect', async (reaction, reactionCollector) => {
                              if (reaction.emoji.name === '❌') {
                                c.edit(embed7)
                              } else if (reaction.emoji.name === '✅') {
                                c.edit(embed6)

                                var Achannel = client.channels.get('605775495077822474') //commission channel

                                const embed8 = new Discord.RichEmbed()
                                .setTitle('New Commission')
                                .setDescription('** **\nPlease react with ✅ to claim the commission.\n\n** **')
                                .addField('Title:', `${title}`, true)
                                .addField('Timeframe:', `${timeframe}`, true)
                                .addField('Budget:', `${budget}`, true)
                                .addField('Description:', `${description}`, false)
                                .addField('Any Extra Details?', `${description}`, true)
                                .addBlankField(true)
                                .addField('Ticket:', `<#${message.channel.id}>`, true);
                                Achannel.send(`<@&${role2.id}>`);
                                let m = await Achannel.send(embed8);

                                m.react('✅');
                                await delay(100);
                                m.react('❌');

                                const filter2 = (reaction, user) => {
                                  return !user.bot &&(reaction.emoji.name === '✅' || reaction.emoji.name === '❌');
                                };

                                const collector = m.createReactionCollector(filter2);
                                collector.on("collect", reaction => {
                                  if (reaction.emoji.name === '✅') {
                                    const embed9 = new Discord.RichEmbed()
                                    .setDescription(`Commission has been claimed by **user**!`);

                                    message.channel.overwritePermissions(message.guild.defaultRole, {
                                      VIEW_CHANNEL: true,
                                      SEND_MESSAGES: true
                                    })

                                    m.edit(embed9);

                                    const embed10 = new Discord.RichEmbed()
                                    .setDescription('Your commission has been claimed by **user**!')

                                    message.channel.send(embed10)
                                  }
                                })
                              }
                            });

                        })
                        .catch(collected => {
                          message.channel.send(ended);
                          console.log(collected);
                        });
                  })
                  .catch(collected => {
                    message.channel.send(ended);
                    console.log(collected);
                  });
          })
          .catch(collected => {
            message.channel.send(ended);
            console.log(collected);
          });

      })
      .catch(collected => {
        message.channel.send(ended);
        console.log(collected);
      });


    })
    .catch(collected => {
      message.channel.send(ended);
      console.log(collected);
    });

  })
  .catch(collected => {
    message.channel.send(ended2);
    console.log(collected);
  });
}
module.exports.config = {
  name: "commission",
  aliases: ["commissions"]
}
