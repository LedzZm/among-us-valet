module.exports = {
	name: 'setChannelMuteState',
    description: 'Mutes all users in a channel!',
    /*
     * @message Discord.js message object
     * @muteState {boolean}
    */
	execute(message, muteState, [seconds, channel]) {
        // channel = channel || message.member.voice?.channel
        message.member.voice?.channel.members
            .each(member => member.voice.setMute(muteState))
	},
};