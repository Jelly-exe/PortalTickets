// Imports
const Discord = require("discord.js");
const Enmap = require("enmap");
const fs = require("fs");
const log = require('leekslazylogger')
const mysql = require("mysql");
const con = require('./database.js');
const config = require("./config-files/main.json");



// Create Discord client
const client = new Discord.Client();
client.config = config;

client.commands = new Enmap();
client.aliases = new Discord.Collection();

// Initialize logger
log.init();


let a = 1
fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    log.info(a + `: Attempting to load the event '${eventName}'`);
    a = a + 1;
    client.on(eventName, event.bind(null, client));
  });
});

fs.readdir("./commands/", (err, files) => {
    let jsfile = files.filter(f => f.split(".").pop() === "js")
    if (jsfile.length <= 0) {
        log.warn("Couldn't find commands!")
        return;
    };
    jsfile.forEach((f, i) => {
        let props = require(`./commands/${f}`);
        log.info(a + `: Attempting to load the command '${f}'`)
        client.commands.set(props.config.name, props);
        props.config.aliases.forEach(alias => {
            client.aliases.set(alias, props.config.name)
        });
        a = a + 1;
    });
    log.info("Successfully loaded all commands.")
});

client.login('NTkxMzIwMjk2Nzk1OTMwNjMz.XQvEDw.1a6r8uOZmTNOLS0H_ms1h2X2WoE');