const wiki = require('wikipedia');

module.exports = {
    name: 'wikipedia',
    aliases: ['wiki', 'w'],
    description: 'Returns the search summary from a wikipedia article',
    async execute(client, cmd, message, args, Discord){
        let page_summary = await wiki.summary(args.join(' '));
        if (page_summary.title == 'Not found.') {
            const key_search = await wiki.search(args.join(' '));
            for (var i of key_search.results) {
                page_summary = await wiki.summary(i.title);
                break;
            }
        }   
        let textEmbed = new Discord.MessageEmbed()
            .setAuthor('Wikipedia', 'https://bit.ly/3ocP6K8', 'https://en.wikipedia.org')
            .setColor("RANDOM")
            .setURL('https://en.wikipedia.org')
            .setFooter(message.member.user.tag, message.author.avatarURL())
            .setTimestamp()
            .setTitle(page_summary.title)
            .setDescription(page_summary.extract)
            .addField('Short Explanation', page_summary.description)
            .setImage(page_summary.originalimage.source);
        message.channel.send({embeds: [textEmbed]});
    }
}