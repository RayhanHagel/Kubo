// Discord.js Config
const {
    Client,
    Intents,
    MessageSelectMenu
} = require("discord.js");
const bot = new Client({
    intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES],
});


// Python Config
const {
    spawn
} = require('child_process');


// Wikipedia Config
const wiki = require('wikipedia')


// JavaScript Module
const cmdHelp = require('./jscript/cmd-help');
const cmdSum = require('./jscript/cmd-sum');
const cmdPing = require('./jscript/cmd-ping');
const cmdStats = require('./jscript/cmd-stats');


// Default Parameters
const token = "";
const PREFIX = "+";
const author_name = "Rigeru";


// Discord.js Loaded
bot.on("ready", () => {
    console.log(`Welcome ${author_name}, your discord application has loaded`);
});


bot.on("message", (msg) => {
    // Ignore Bot
    if (msg.author.bot) return;

    // Prefix and Argument Input
    if (msg.content.startsWith(PREFIX)) {
        const [CMD_NAME, ...args] = msg.content
            .trim()
            .substring(PREFIX.length)
            .split(/\s+/);

        // Help Command
        if (CMD_NAME.toLowerCase() == "help") {
            let text = cmdHelp.cmd_help(args[0]);
            msg.channel.send(text);
            console.log(`${msg.member.user.tag} -> help command ${args[0]}\n`);
        }

        // Add Command
        if (CMD_NAME.toLowerCase() == "sum") {
            let sum = cmdSum.cmd_sum(args);
            msg.channel.send(sum);
            console.log(`${msg.member.user.tag} -> ${sum}\n`);
        }

        // Ping Command
        if (CMD_NAME.toLowerCase() == "ping") {
            let text = cmdPing.cmd_ping(args, Math.round(bot.ws.ping));
            msg.channel.send(text);
            console.log(`${msg.member.user.tag} -> ${text}\n`);
        }

        // Say Command
        if (CMD_NAME.toLowerCase() == "say") {
            let text = cmdSay.cmd_say(args);
            msg.reply(text);
            console.log(`${msg.member.user.tag} -> say command\n`);
        }

        // Wikipedia Command
        if (CMD_NAME.toLowerCase() == 'wiki' || CMD_NAME.toLowerCase() == 'wikipedia') {
            (async () => {
                try {
                    // Summary and others
                    const page_summary = await wiki.summary(args.join(' '));
                    let title = page_summary.title;
                    let description = page_summary.description.replace(title, `**${title}**`);
                    let paragraph = page_summary.extract.replace(title, `**${title}**`);
                    let thumbnail = page_summary.originalimage.source;

                    // Send to Discord
                    msg.channel.send(`**${title}**\n${description}\n\n${paragraph}\n${thumbnail}`);
                    console.log(`${msg.member.user.tag} -> Searched for ${title} in wikipedia\n`);

                    // If Wikipedia API gives error statement
                } catch (error) {
                    console.log(`Wikipedia Error -> ${error}\n`);
                    const child = spawn('python', ['script/wiki-api.py', args.join(' ')])

                    // Print Data from Python Script
                    child.stdout.on('data', (data) => {
                        // Encode Text from Buffer into readable string
                        let text = data.toString();

                        // If article does not exist
                        if (text.search("index error") != -1) {
                            msg.channel.send(`Sorry ${msg.member}... I can't seem to find an article about **${args.join(' ')}**`);
                            return;
                        }

                        // If article ends with "... refers to"
                        if (text.search("commonly refers to") != -1 || text.search("often refers to") != -1 || text.search("may refer to") != -1) {
                            text = `Sorry ${msg.member}... The article doesn't give an explanation about **${args.join(' ')}**`
                        }

                        // Send message through discord
                        msg.channel.send(text);
                        console.log(`${msg.member.user.tag} -> searched for ${args.join(' ')}`);
                        console.log(`stdout: data has been printed through discord\n`);
                    })
                }
            })();
        }

        // Coronavirus Command
        if (CMD_NAME.toLowerCase() == 'covid') {
            const child = spawn('python', ['script/covid-api.py', args.join(' ')])

            // Print Data from Python Script
            child.stdout.on('data', (data) => {
                // Encode Text from Buffer into readable string
                let text = data.toString();

                // If article does not exist
                if (text.search("try again") != -1) {
                    msg.channel.send(`Sorry ${msg.member}... I can't seem to find the data for **${args.join(' ')}**`);
                    return;
                }

                // Send message through discord
                msg.channel.send(text);
                console.log(`${msg.member.user.tag} -> searched for ${args.join(' ')}`);
                console.log(`stdout: data has been printed through discord\n`);
            })
        }

        // Youtube Command
        if (CMD_NAME.toLowerCase() == 'yt' || CMD_NAME.toLowerCase() == 'youtube') {
            const child = spawn('python', ['script/youtube-api.py', args.join(' ')])

            // Print Data from Python Script
            child.stdout.on('data', (data) => {
                // Encode Text from Buffer into readable string
                let text = data.toString();

                // Send message through discord
                msg.channel.send(text);
                console.log(`${msg.member.user.tag} -> searched for ${args.join(' ')}`);
                console.log(`stdout: data has been printed through discord\n`);
            })
        }

        // Brainly Command
        if (CMD_NAME.toLowerCase() == 'br' || CMD_NAME.toLowerCase() == 'brainly') {
            const child = spawn('python', ['script/brainly-api.py', args.join(' ')])

            // Print Data from Python Script
            child.stdout.on('data', (data) => {
                // Encode Text from Buffer into readable string
                let text = data.toString();

                // Send message through discord
                msg.channel.send(text);
                console.log(`${msg.member.user.tag} -> searched for brainly results`);
                console.log(`stdout: data has been printed through discord\n`);
            })
        }

        // Statistics Command
        if (CMD_NAME.toLowerCase() == 'st' || CMD_NAME.toLowerCase() == 'statistic') {
            let text = cmdStats.cmd_stats(args);
            msg.channel.send(text);
            console.log(`${msg.member.user.tag} -> used statistics command\n`);
        }
    }
})

bot.login(token);