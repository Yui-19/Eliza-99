//jshint esversion:8
const dictionary = require("urban-dictionary");
const Levels = require("discord-xp");
async function ud(term) {
  try {
    return await dictionary.define(term);
  } catch (error) {
    return "error";
  }
}

const execute = async (client, msg, args) => {

  //discord-xp
  var cmd_user=await msg.getContact();
  if(!cmd_user.isMe){
  try{
    const data =await Levels.fetch(cmd_user.id.user, "Global", false);
  var data_level=data.level
  console.log("discord-xp");
  console.log(data_level);
  }
  catch(error){
      console.log(error);
  }
}

//feature
console.log(parseInt(data_level));
if(parseInt(data_level)>=2||cmd_user.isMe){
  const chat = await msg.getChat();
    const idk=await chat.id._serialized;
  // msg.delete(true);
  let data = await ud(args.join(" "));
  if (data == "error") {
    await client.sendMessage(
      idk,
      `*Error*\n\n` +
        "```Something unexpected happened while lookup on urban dictionary```"
    );
  } else {
    await client.sendMessage(
      idk,
      "*Term :* ```" +
        args.join(" ") +
        "```\n\n" +
        "*Definition :* ```" +
        data[0].definition +
        "```\n\n" +
        "*Example :* ```" +
        data[0].example +
        "```"
    );
  }
}else{
  await msg.reply("This feature unlocks at level 2\n\nType *!lvl* for your current level");
}

};

module.exports = {
  name: "Urban dictionary",
  description: "Gets dictionary meanings of words",
  command: "!ud",
  commandType: "plugin",
  isDependent: false,
  help: `*Urban dictionary*\n\nUrban dictionary is a crowdsourced online dictionary for slang words and phrases\n\n*!ud [Word]*\n\nTo search a word using urban dictionary`,
  execute,
};
