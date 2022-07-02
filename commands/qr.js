//jshint esversion:8
const {MessageMedia} = require('whatsapp-web.js');
const Levels = require("discord-xp");
const qr = require('qr-image');

async function qrgen(text) {

    const data = ({
        mimetype: "image/png",
        data: await (qr.imageSync(text, { type: 'png' }).toString('base64')),
        filename: text + ".png"
    });
    return data;
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

    if(msg.hasQuotedMsg) {
        let quotedMsg = await msg.getQuotedMessage();
        data = await qrgen(quotedMsg.body);
        msg = quotedMsg;
    }
    else {
        data = await qrgen(args.join(' '));
    }
    
    await chat.sendMessage(new MessageMedia(data.mimetype, data.data, data.filename), { caption: `QR code for\n` + "```" + msg.body + "```" });
    }else{
        await msg.reply("This feature unlocks at level 1\n\nType *!lvl* for your current level");
      }
};

module.exports = {
    name: 'Qr generator',
    description: 'Generates qr for given text',
    command: '!qr',
    commandType: 'plugin',
    isDependent: false,
    help: '`*Qr generator*\n\nGenerates qr code with this module just send the text it will generate qr code image for you\n\n*!qr [Text]*\n\nReply a message with *!qr* to create`',
    execute};
