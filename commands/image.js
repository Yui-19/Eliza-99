//jshint esversion:8
const {MessageMedia} = require('whatsapp-web.js');
const Levels = require("discord-xp");
const execute = async (client,msg) => {
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
// console.log(parseInt(data_level));
if(cmd_user.isMe||parseInt(data_level)>=2){

    const chat = await msg.getChat();
    const idk=await chat.id._serialized;
    let contact=await msg.getContact();
    if(contact.isMyContact || contact.isMe){
    let quotedMsg = await msg.getQuotedMessage();
    if (quotedMsg.hasMedia) {
        let attachmentData = await quotedMsg.downloadMedia();
        await client.sendMessage( idk, new MessageMedia(attachmentData.mimetype, attachmentData.data, attachmentData.filename));
    } else { 
        await client.sendMessage(idk, `*Error*\n\n` + "```No image found to make a sticker```");
    }
}
else{
    await msg.reply("*Eliza has revoked your access to this command*");
}
}else{
    await msg.reply("This feature unlocks at level 2\n\nType *!lvl* for your current level");
  }

};

module.exports = {
    name: 'Image',
    description: 'Generates an image from a sticker',
    command: '!image',
    commandType: 'plugin',
    isDependent: false,
    help: `*Image*\n\nCreates an image from a sticker\n\nReply a sticker with *!image* to get an image of that sticker`,
    execute};
