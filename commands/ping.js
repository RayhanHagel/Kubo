module.exports = {
    name: 'ping',
    aliases: ['p', 'latency'],
    description: 'Returns the Discord Webhook latency in ms',
    async execute(client, cmd, message, args, Discord) {
        let textEmbed = new Discord.MessageEmbed()
            .setTitle("Ping Command")
            .setColor("RANDOM")
            .setURL('https://github.com/RayhanHagel/Kubo/blob/main/commands/ping.js')
            .setFooter(message.member.user.tag, message.author.avatarURL())
            .setTimestamp();
    
        switch(args.length) {
            case 0:
                textEmbed.addField('Discord Webhook Latency', `${client.ws.ping} ms`);    
                break;
            default:
                textEmbed.addField('Error!', "Ping command doesn't expect any argument");    
        }
        message.channel.send({embeds: [textEmbed]});
    }
}