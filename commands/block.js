//jshint esversion:8
const execute = async (client, msg) => {
  if (!msg.to.includes("-")) {
    await msg.reply(`Hey I haven't approved you for personal messaging me yet , my mistress will respond when she comes back online if she wants to\n\nPlease don't spam unless you wish to be blocked and reported\n\nUmm as I have already mentioned above that this is not a right place for you to spam however you ignored that message so I just blocked you\n\nNow you can't do anything until my mistress comes online and unblocks you ! Good bye have a great day ahead`);
    let chat = await msg.getChat();
    let contact = await chat.getContact();
    contact.block();
  }
};

module.exports = {
  name: "Block", 
  description: "Blocks current chat with your own custom text", 
  command: "!block", 
  commandType: "admin", 
  isDependent: false,
  help: "Type !block in the chat to block the user", 
  execute,
};
