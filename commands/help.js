module.exports = {
    name: 'help',
    aliases: ['h'],
    description: 'Returns the help result for the command',
    async execute(client, cmd, message, args, Discord) {
        let textEmbed = new Discord.MessageEmbed()
            .setTitle('Help Command')
            .setColor('RANDOM')
            .setURL('https://github.com/RayhanHagel/Kubo/blob/main/commands/help.js')
            .setFooter(message.member.user.tag, message.author.avatarURL())
            .setTimestamp();
        
        switch(args.length) {
            case 0:
                textEmbed.addFields(
                    { name: 'Sum', value: 'sum <integer input>', inline: true},
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: 'Ping', value: 'ping <no variable needed>', inline: true},
                    { name: 'Say', value: 'say <input line>', inline: true},
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: 'Wikipedia', value: 'wiki <search key>', inline: true},
                    { name: 'Covid', value: 'covid <country>', inline: true},
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: 'Youtube', value: 'youtube <search key>', inline: true},
                    { name: 'Brainly', value: 'brainly <question>', inline: true},
                    { name: '\u200B', value: '\u200B', inline: true},
                    { name: 'Statistics', value: '<st or st2> <variable array>', inline: true}
                );
                break;

            case 1:
                switch(args[0]) {
                    case 'sum':
                        textEmbed.addFields(
                            { name: 'Input Variable', value: ':inbox_tray: sum <integer input>'},
                            { name: 'Output Variable', value: ':outbox_tray: Returns the total product from the integer given'}
                        );
                        break;
                    
                    case 'ping':
                        textEmbed.addFields(
                            { name: 'Input Variable', value: ':inbox_tray: ping <no variable needed>'},
                            { name: 'Output Variable', value: ':outbox_tray: Returns the Discord Webhook latency in ms'}
                        );
                        break;

                    case 'say':
                        textEmbed.addFields(
                            { name: 'Input Variable', value: ':inbox_tray: say <input line>'},
                            { name: 'Output Variable', value: ':outbox_tray: Returns the input that the user triggered'}
                        );
                        break;
                    
                    case 'wiki':
                        textEmbed.addFields(
                            { name: 'Input Variable', value: ':inbox_tray: wiki <search key>'},
                            { name: 'Output Variable', value: ':outbox_tray: Returns the search summary from a wikipedia article'}
                        );
                        break;

                    case 'covid':
                        textEmbed.addFields(
                            { name: 'Input Variable', value: ':inbox_tray: covid <country>'},
                            { name: 'Output Variable', value: ':outbox_tray: Returns the statistics for the country'}
                        );
                        break;
                    
                    case 'youtube':
                        textEmbed.addFields(
                            { name: 'Input Variable', value: ':inbox_tray: youtube <search key>'},
                            { name: 'Output Variable', value: ':outbox_tray: Returns the top search video link'}
                        );
                        break;
                    
                    case 'brainly':
                        textEmbed.addFields(
                            { name: 'Input Variable', value: ':inbox_tray: brainly <question>'},
                            { name: 'Output Variable', value: ':outbox_tray: Returns the answer from the top result'}
                        );
                        break;
                    
                    case 'statistic':
                        textEmbed.addFields(
                            { name: 'Input Variable', value: ':inbox_tray: stats <variable array>'},
                            { name: 'Output Variable', value: ':outbox_tray: Returns the statistics from the array given'}
                        );
                        break;
                    
                    default:
                        textEmbed.addFields(
                            { name: 'Input Variable', value: `:inbox_tray: ${args.join(' ')}`},
                            { name: 'Output Variable', value: ':outbox_tray: Cant seem to find that command'}
                        );
                }
                break;
            default:
                textEmbed.addFields(
                    { name: 'Input Variable', value: `:inbox_tray: ${args.join(' ')}`},
                    { name: 'Output Variable', value: ':outbox_tray: Cant seem to find that commands'}
                );
        }
        message.channel.send({embeds: [textEmbed]});
    }
}