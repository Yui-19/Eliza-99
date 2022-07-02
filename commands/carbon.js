//jshint esversion:8

//TODO: fix it
const { MessageMedia } = require('whatsapp-web.js');
const axios = require('axios');
const Levels = require("discord-xp");
async function carbon(text) {

    let respoimage = await axios.get(`https://carbonnowsh.herokuapp.com/?code=${text.replace(/ /gi,"+")}&theme=darcula&backgroundColor=rgba(36, 75, 115)`, { responseType: 'arraybuffer' }).catch(function(error) {
        return "error";
    });

    return ({
        mimetype: "image/png",
        data: Buffer.from(respoimage.data).toString('base64'),
        filename: "carbon"
    });
}

const execute = async (client,msg,args) => {

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
    if(parseInt(data_level)>=1||cmd_user.isMe){


    const chat = await msg.getChat();
    let data;

    // msg.delete(true);
    if( msg.hasQuotedMsg){
        let quotedMsg = await msg.getQuotedMessage();
        data = await carbon(quotedMsg.body);
        msg = quotedMsg;
    }
    else {
        data = await carbon(args.join(' '));
    }

    if (data == "error") {
        await chat.sendMessage(msg.to, `*Error*\n\n` + "```Something unexpected happened to create the carbon```");
    } else {
        await chat.sendMessage(new MessageMedia(data.mimetype, data.data, data.filename), { caption: `Carbon for\n\n` + "```" + msg.body.replace("!carbon ", "") + "```" });
    }

}else{
    await msg.reply("This feature unlocks at level 1\n\nType *!lvl* for your current level");
  }
};


module.exports = {
    name: 'Carbon',
    description: 'Creates a carbon.now.sh image from text',
    command: '!carbon',
    commandType: 'plugin',
    isDependent: false,
    help: `*Carbon*\n\nGenerates beautiful image with carbon.now.sh. Just send the text it will generate an image for you\n\n*!carbon [Text]*\n\nReply a message with *!carbon* to create`,
    execute};
