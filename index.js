const fs = require('fs');
const Discord = require('discord.js');
const client = new Discord.Client();

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// TODO: Add env support (even w/o heroku)
// TODO: Add init command

client.on('message', message => {
    // Do nothing if prefix was not used.
    if (!message.content.startsWith(process.env.COMMAND_PREFIX) || message.author.bot)
        return;

    /* TODO: Check using Permisions and/or Roles
     * Make PermisionsManager/Checker/Whatever class and do the check inside the commands if it becomes complicated.
     * Possibly also check if user is playing among us (Do add toggle function for this)
     */
    if (!['Koyniados', 'metalspirit', 'Lyfein'].includes(message.author.username))
        return;

    const args = message.content.slice(process.env.COMMAND_PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'mute':
            client.commands.get('setChannelMuteState').execute(message, true, args);
            break;
        case 'unmute':
            client.commands.get('setChannelMuteState').execute(message, false, args);
            break;
    }
});

// Investigate ways to abstract this.
client.login(process.env.DISCORD_TOKEN);
