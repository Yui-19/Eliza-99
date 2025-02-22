const Levels = require("discord-xp");
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const path = require('path');
const config = require("../config");
const { MessageMedia } = require("whatsapp-web.js");
// const stream = require('stream');
const execute = async (client,msg,args) => {
    var qm= await msg.getQuotedMessage();
    var media = await qm.downloadMedia();
    const chat= await msg.getChat();
    console.log(JSON.stringify("SENDING...."));
    // fs.createReadStream('test_gfg.txt').pipe(media.dat);
    var buf = Buffer.from(media.data, 'base64');
    fs.writeFileSync("rbimage.png", buf);
    // const pipeline = promisify(stream.pipeline);
    // await pipeline(media.data,fs.writeFileSync("./rbimage.jpeg"));
const inputPath = "./rbimage.png";
const formData = new FormData();
formData.append('size', 'auto');
formData.append('image_file', fs.createReadStream(inputPath), path.basename(inputPath));

axios({
  method: 'post',
  url: 'https://api.remove.bg/v1.0/removebg',
  data: formData,
  responseType: 'arraybuffer',
  headers: {
    ...formData.getHeaders(),
    'X-Api-Key': config.RG,
  },
  encoding: null
})
.then((response) => {
  if(response.status != 200) return console.error('Error:', response.status, response.statusText);
  fs.writeFile("no-bg.png", response.data,()=>{const bg_removed=MessageMedia.fromFilePath(path.join(__dirname, "../no-bg.png"));
   chat.sendMessage(bg_removed);});
})
.catch((error) => {
    return console.error('Request failed:', error);
});
    
  }; 
      
    module.exports = {
      name: "Rb",
      description: "Removes background from an image",
      command: "!rb",
      commandType: "plugin",
      isDependent: false,
      help: "Type !rb while quoting any image",
      execute,
    };
