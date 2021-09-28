// Coronavirus Command
if (CMD_NAME.toLowerCase() == 'covid') {
    if (args.length == 0) args.push('total');
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
