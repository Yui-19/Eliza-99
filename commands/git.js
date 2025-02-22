//jshint esversion:8
const {MessageMedia} = require('whatsapp-web.js');
const axios = require('axios');

async function downloadzip(url, name) {
    try {
        return {
            status: true,
            data: Buffer.from((await axios.get(url, { responseType: 'arraybuffer' })).data).toString('base64'),
            filename: `${name}.zip`,
            mimetype: 'application/zip'
        };
    } catch (err) {
        return {
            status: false
        };
    }
}

async function gitinfo(url) {
    let repo;
    try {
        repo = {
            user: url.split('/')[3],
            repo: url.split('/')[4].split('?')[0]
        };
        if (repo.user == undefined || repo.repo == undefined) throw err;
    } catch (err) {
        return {
            status: false,
            msg: "This is not a valid github repository url"
        };
    }

    try {
        const repodata = (await axios.get(`https://api.github.com/repos/${repo.user}/${repo.repo}`)).data;

        return {
            status: true,
            msg: `*${repodata.name}* - ${repodata.description?repodata.description:''}\n\nAuthor : ${repodata.owner.login}\nTotal stars : ${repodata.stargazers_count}\nTotal forks : ${repodata.forks}\nLicense : ${repodata.license?repodata.license.name:'No license'}`,
            data: await downloadzip(`https://github.com/${repo.user}/${repo.repo}/archive/${repodata.default_branch}.zip`, repodata.name)
        };
    } catch (err) {
        return {
            status: false,
            msg: "This repository is not available maybe this is not a public repository"
        };
    }
}

const execute = async (client,msg,args) => {
    // msg.delete(true);
    let data = await gitinfo(args[0]);
    if (data.status) {
        if (data.data.status) {
            await client.sendMessage(msg.to, new MessageMedia(data.data.mimetype, data.data.data, data.data.filename));
        }
        await client.sendMessage(msg.to, data.msg);
    } else {
        await client.sendMessage(msg.to, `*Error*\n\n` + "```" + data.msg + "```");
    }
};

module.exports = {
    name: 'Git info',
    description: 'Gets information for requested git repo',
    command: '!git',
    commandType: 'plugin',
    isDependent: false,
    help: `*Github*\n\nGet a github repository in zip format with it's details\n\nSend a message with *!git [Github-Url]* to execute`,
    execute};
