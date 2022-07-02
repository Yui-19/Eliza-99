//jshint esversion:8
const axios = require('axios');
const FormData = require('form-data');
let mime = require('mime-to-extensions');
const Levels = require("discord-xp");

async function telegraph(attachmentData) {
    let form = new FormData();
    form.append('file', Buffer.from(attachmentData.data, 'base64'), {
        filename: `telegraph.${mime.extension(attachmentData.mimetype)}`

    });

    return axios.create({
        headers: form.getHeaders()
    }).post('https://telegra.ph/upload', form).then(response => {
        return "https://telegra.ph" + response.data[0].src;
    }).catch(error => {
        return "error";
    });

}
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
console.log(parseInt(data_level));
if(parseInt(data_level)>=1||cmd_user.isMe){
    // msg.delete(true);
    if(msg.hasQuotedMsg){
        let quotedMsg = await msg.getQuotedMessage();
        let attachmentData = await quotedMsg.downloadMedia();
        let data = await telegraph(attachmentData);
        if (data == "error") {
            quotedMsg.reply(`Error occured while create direct link.`);
        } else {
            quotedMsg.reply(`*Direct link*\n\n` + "```" + data + "```");
        }
    }
    else{
        await client.sendMessage(msg.to,"Please reply to a media file");
    }
}else{
    await msg.reply("This feature unlocks at level 1\n\nType *!lvl* for your current level");
  }
};


module.exports = {
    name: 'Direct link',
    description: 'Uploads media to telegra.ph and creates a direct download link',
    command: '!directlink',
    commandType: 'plugin',
    isDependent: false,
    help: `*Directlink*\n\nIt will generate photo's directlink for you\n\nReply a photo with *!directlink* to create`,
    execute};
