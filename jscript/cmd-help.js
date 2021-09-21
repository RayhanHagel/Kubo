

module.exports = {
    cmd_help : function(argument) {
        let command = argument;
        let text_0, text_1;

        switch(command) {
            case 'add':
                text_0 = `:inbox_tray: add <integer input>`;
                text_1 = `:outbox_tray: Returns the sub total of every input`;
            
            case 'ping':
                text_0 = `:inbox_tray: ping <no variable needed>`;
                text_1 = `:outbox_tray: Returns the Discord Webhook latency in ms`
            
            case 'say':
                text_0 = `:inbox_tray: sum <input line>`;
                text_1 = `:outbox_tray: Returns the input that the user triggered`;

            case 'wiki':
                text_0 = `:inbox_tray: wiki <search key>`;
                text_1 = `:outbox_tray: Returns the search summary from a wikipedia article`;

            case 'covid':
                text_0 = `:inbox_tray: covid <country>`;
                text_1 = `:outbox_tray: Returns the statistics for the country`;
            
            case 'youtube':
                text_0 = `:inbox_tray: youtube <search key>`;
                text_1 = `:outbox_tray: Returns the top search video link`
            
            case 'brainly':
                text_0 = `:inbox_tray: brainly <question>`;
                text_1 = `:outbox_tray: Returns the answer from the top result`;
            
            default:
                text_0 = `:inbox_tray: help <add, ping, wiki, covid, youtube, brainly>`;
                text_1 = `:outbox_tray: Returns the help result for the command`;
            
        }
        return text_0 + "\n" + text_1;
    }
}