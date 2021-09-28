// Frequency
function counter(array) {
    let a = array, result = {}
    for (var i = 0; i < a.length; i++) {
        if (!result[a[i]]) result[a[i]] = 0;
        ++result[a[i]];
    }
    return result;
}

// Max and Min
function maxi(array) {
    let max, min;
    for (var i in array) {
        if (!max) {max = i; min = i;}
        if (parseInt(i) > max) max = parseInt(i);
        if (min > parseInt(i)) min = parseInt(i);
    }
    return [parseInt(max), parseInt(min)];
}

module.exports = {
    name: 'stats',
    aliases: ['s2'],
    description: 'Returns the statistics from the array given',
    async execute(client, cmd, message, args, Discord) {
        let textEmbed = new Discord.MessageEmbed()
            .setTitle("Statistic Command")
            .setColor("RANDOM")
            .setURL('https://github.com/RayhanHagel/Kubo/blob/main/commands/stats.js')
            .setFooter(message.member.user.tag, message.author.avatarURL())
            .setTimestamp();

        switch(args.length) {
            case 0:
                textEmbed.addField('Error!', 'No Input detected');
                break;

            default:
                let arr = args.map(function (x) {return parseInt(x, 10);});
                let frequency=counter(arr);
                switch(cmd) {
                    case 's2':
                        for (var i in frequency) textEmbed.addField(`${i}`, `${frequency[i]}`, true);  
                        break;
    
                    default:
                        let sizes=maxi(frequency), max_total=sizes[0], min_total=sizes[1], dif=Math.ceil(max_total-min_total);
                        let group = Math.round(1 + 3.3 * Math.log10(arr.length));
                        let range =  Math.round(dif / group) ;

                        textEmbed.addFields(
                            {name: 'Min', value: `${min_total}`, inline:true},
                            {name: 'Max', value: `${max_total}`, inline:true},
                            {name: 'Diff', value: `${dif}`, inline:true},
                            {name: 'Group', value: `${group}`, inline:true},
                            {name: 'Range', value: `${range}`, inline:true},
                            {name: '\u200B', value: '\u200B', inline:true},
                            {name: '\u200B', value: '\u200B'}
                        );
                        
                        let points=0, min=min_total, max=min_total+range-1;
                        
                        for (let occurence=1; occurence <= group; occurence++){
                            for (var i in frequency) {
                                if (occurence == group) {
                                    if (i >= min && i <= max_total) points += frequency[i];
                                    if (i == max_total) textEmbed.addField(`${min}~${max_total}`, `${points}`, true);
                                }
                                if (occurence != group) {
                                    if (i >= min && i <= max) points += frequency[i];
                                    if (i > max) {
                                        textEmbed.addField(`${min}~${max}`, `${points}`, true);
                                        max += range, min += range, points=0;
                                        break;
                                    }			
                                }
                            }
                        }
                }
        }
        message.channel.send({embeds: [textEmbed]});
    }
}