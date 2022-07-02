const pmpermit = require("../helpers/pmpermit");
const execute = async (client,msg/*,args*/) => {
    // await client.sendMessage(msg.to,"lets go save.js");

    const chat = await msg.getChat();
    //   await  chat.sendMessage("Save.js");
      var contact=await msg.getContact();
      var user_id=contact.pushname;
      var chat_id=chat.id._serialized;


      if(contact.id.user=="917869764541"){
          user_id="Yuki";
      } 
    //   await chat.sendMessage(JSON.stringify(chat_id));
        
    var idx=msg.body.indexOf("@");
        var leftremoved=msg.body.substring(idx);
        var rightspace_idx=leftremoved.indexOf(" ");
        var tagged_num="";
        try{
        tagged_num=leftremoved.substring(1,rightspace_idx);
        }
        catch (error){
            console.log("hi");
        }
        if(rightspace_idx==-1){
            tagged_num=leftremoved.substring(1);
        }

    const mentions = await msg.getMentions();

    for(let ct of mentions){
        // await chat.sendMessage(`${ct.pushname}`);
        
        var tagged_one=ct.pushname;
        // await chat.sendMessage(tagged_one);
        // await client.sendMessage(msg.to,tagged_num.substring(1));
        // const mentions = await msg.getMentions();
    try{
        //NEW FEATURE OKKKK

    let val= await pmpermit.Tag_Saver(tagged_num,msg.body,user_id,tagged_one,chat_id);

    // await chat.sendMessage("Tag Saved");
    }
    catch (error){
        await client.sendMessage(msg.to,"Ts function is not working , please notify eliza about this if you see this message");
    }

}
    // await client.sendMessage(msg.to,"saved");
};

module.exports = {
    name: 'Tagged', 
    description: 'Saves tags ', 
    command: '!tagged', 
    commandType: 'none', 
    isDependent: false, 
    help: 'Trin',
    execute};
