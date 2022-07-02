//jshint esversion:8
const weatherjs = require("weather-js");

async function fetchweather(query) {
  const weatherfind = new Promise((resolve, reject) => {
    weatherjs.find({ search: query, degreeType: "C" }, function (err, result) {
      if (err) {
        resolve("error");
      } else {
        resolve(result);
      }
    });
  });
  return weatherfind;
}

const execute = async (client, msg, args) => {
  const chat = await msg.getChat();
  // msg.delete(true);
  var data = await fetchweather(args.join(" "));
  if (data == "error") {
    await chat.sendMessage(
      
      `*Error*\n\n` + "```Something unexpected happened to fetch weather```"
    );
  } else {
    var weather = data[0];
    await chat.sendMessage(
      
      `*Today's weather at ${weather.location.name}*\n` +
        "```" +
        weather.current.skytext +
        " (" +
        weather.current.temperature +
        "°C)```\n*Feels like :* " +
        "```" +
        weather.current.feelslike +
        "°C```\n*Humidity :* " +
        "```" +
        weather.current.humidity +
        "```"
    );
  }
};

module.exports = {
  name: "Weather",
  description: "Gets weather info for given location",
  command: "!weather",
  commandType: "plugin",
  isDependent: false,
  help: `*Weather*\n\nLookup a city's weather with this command\n\n*!weather [Place-Name]*\n\nTo check a weather`,
  execute,
};
