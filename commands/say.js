
module.exports = {
    name: 'say',
    aliases: ['said'],
    description: 'Returns the input that the user triggered',
    async execute(client, cmd, message, args, Discord) {
        let textEmbed = new Discord.MessageEmbed()
            .setTitle("Say Command")
            .setColor("RANDOM")
            .setURL('https://github.com/RayhanHagel/Kubo/blob/main/commands/say.js')
            .setFooter(message.member.user.tag, message.author.avatarURL())
            .setTimestamp();
        
        switch(args.length) {
            case 0:
                textEmbed.addFields(
                    {name: "Error!", value: "No variable input detected"},
                    {name: '\u200B', value: '\u200B'},
                    {name: "Input Structure", value: "say <input line>"}
                );
                break;
            
            default:
                textEmbed
                    .setDescription(args.join(' '));
        }
        message.channel.send({embeds: [textEmbed]});
    }
}