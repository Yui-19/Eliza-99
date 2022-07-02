//jshint esversion:8
const config = require("../config");
const pmpermit = require("../helpers/pmpermit");

const execute = async (client, msg) => {
  if (config.pmpermit_enabled == "true" && !msg.to.includes("-")) {
    await pmpermit.permit(msg.to.split("@")[0]);
    msg.reply("You have permission to send me personal messages");
  }
};

module.exports = {
  name: "Allow",
  description: "Allows an user to personal message you",
  command: "!allow",
  commandType: "plugin",
  isDependent: false,
  help: `You can allow him for pm by these commands\n\n*!allow* - allows an user to personal message you\n\n*!nopm* - disallows an allowed user to personal message you`,
  execute,
};
