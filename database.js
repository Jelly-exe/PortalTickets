const Discord = require("discord.js");
const fs = require("fs");
const mysql = require("mysql");
const config = require("./config-files/database.json");

const con = mysql.createPool({
    host: config.host,
    port: config.port,
    user: config.user,
    password: config.password,
    database: config.database
});

module.exports = con;