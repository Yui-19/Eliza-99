//jshint esversion:8
const config = require("../config");
const pmpermit = require("../helpers/pmpermit");

const execute = async (client, msg) => {
  if (config.pmpermit_enabled == "true" && !msg.to.includes("-")) {
    await pmpermit.nopermit(msg.to.split("@")[0]);
    msg.reply("*You haven't permission to send me personal messages");
  }
};

module.exports = {
  name: "Nopm",
  description: "Disallows an allowed user to persoanl message you",
  command: "!nopm",
  commandType: "admin",
  isDependent: false,
  help: "Type !nopm in the chat to execute",
  execute,
};
