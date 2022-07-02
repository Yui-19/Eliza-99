//jshint esversion:6

const execute = (client,msg) => msg.reply('Sensei : Yui\n\nPowered by : Eliza');

module.exports = {
    name: 'Ping',
    description: 'Responds with sensei',
    command: '!ping',
    commandType: 'info',
    isDependent: false,
    help: undefined,
    execute};
