module.exports = {
    name: 'sum',
    aliases: [],
    description: 'Returns the total product from the integer given',
    async execute(client, cmd, message, args, Discord) {
        let textEmbed = new Discord.MessageEmbed()
            .setTitle("Sum Command")
            .setColor("RANDOM")
            .setURL('https://github.com/RayhanHagel/Kubo/blob/main/commands/sum.js')
            .setFooter(message.member.user.tag, message.author.avatarURL())
            .setTimestamp();

        switch(args.length) {
            case 0:
                textEmbed.addField('Error!', 'No input detected');
            default:
                let sum=0;
                for (let i=0; i<args.length; i++) sum+=parseInt(args[i]);
                if (`${sum}`=='NaN') textEmbed.addField('Error!', 'Input cannot contain string');
                else textEmbed.addField('Total Output', `${sum}`);
        }
        message.channel.send({embeds: [textEmbed]});
    }
}