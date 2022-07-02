const database = require("../db");
const pmpermit = require("../helpers/pmpermit");
const execute = async (client,msg/*,args*/) => {
    var temp_chat=await msg.getChat();
    await temp_chat.sendMessage("w");
    var temp_contact= await msg.getContact();
    var extracted_array="";
     try{
       var { conn, coll } = await database("Deleted messages");
       
     
     
       var query = {phone_num:temp_contact.id._serialized};
       await temp_chat.sendMessage(temp_contact.id._serialized);
   
       var data = await coll.findOne(query);
     }
       catch(error){
         console.log(error);
       }
       await temp_chat.sendMessage("w");   
       console.log("\n\nhere");
       console.log(data.show);
    await temp_chat.sendMessage(data);
};

module.exports = {
    name: 'Revokedb', 
    description: 'skh', 
    command: '!revokedb', 
    commandType: 'dkt',
    isDependent: false, 
    help: 'olhi',
    execute};
