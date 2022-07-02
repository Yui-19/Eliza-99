const execute = async (client,msg/*,args*/) => {
    try{
        var qm=await msg.getQuotedMessage();
        var reaction=msg.body.substring(7);
        msg.delete(true);
        qm.react(reaction);
    }
    catch(e){
        console.log(error);
    }
};

module.exports = {
    name: 'React',
    description: 'React with any emoji on the quoted message',
    command: '!react',
    commandType: 'plugin',
    isDependent: false, 
    help: '*React*\n\nJust type !react followed by any emoji on a quoted message ( slide left to right on any message )\n\nNote : Make sure that there should be space after !react and nothing after reaction\n\nExample : !react ❤️',
    execute};
