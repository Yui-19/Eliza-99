const { startAfk, afkStatus, stopAfk } = require("../helpers/afkWrapper");

const execute = async (client, msg, args) => {
  msg.delete(true);
  try {
    let commandType = args.shift();

    switch (commandType) {
      case "on": {
        let getstatus = afkStatus();
        if (getstatus.on) throw new Error("Already afk mode is on");
        let message = args.join(" ");
        if (!message) message = "Currently I'm away I will be back soon";
        startAfk(message);
        let msgtosend = `Afk mode is now on\n\nMessage : ${message}`;
        await client.sendMessage(msg.to, msgtosend);
        break;
      }
      case "off": {
        let getstatus = afkStatus();
        if (!getstatus.on) throw new Error("Already afk mode is off");
        stopAfk();
        let msgtosend = "Afk mode is now off";
        await client.sendMessage(msg.to, msgtosend);
        break;
      }
      case "status": {
        let getstatus = afkStatus();
        let msgtosend = `AFK mode is ${getstatus.on ? "on" : "off"}.${
          getstatus.on ? `\n\nMessage : ${getstatus.message}` : ""
        }`;

        await client.sendMessage(msg.to, msgtosend);
        break;
      }
      default: {
        throw new Error(
          "Invalid argument valid arguments are : on , off , status"
        );
      }
    }
  } catch (error) {
    let messagetosend = `Afk command failed\n\n${error?.message}`;
    await client.sendMessage(msg.to, messagetosend);
  }
};

module.exports = {
  name: "Afk",
  description: "Turns on or off afk mode",
  command: "!afk",
  commandType: "admin",
  isDependent: false,
  help: "*Afk*\n\n1. *!afk on message* to turn on afk\n\n2. *!afk off* to turn off afk\n\n3. *!afk status* to check current status of afk",
  execute,
};
