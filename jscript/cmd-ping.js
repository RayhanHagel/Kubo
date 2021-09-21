

module.exports = {
    cmd_ping : function(argument, ping) {
        let command = argument.content;
        let text;

        if (command) {
            text = `:regional_indicator_x: Ping command doesn't expect any argument given`;
        }
        else {
            text = `:white_small_square: Discord webhook latency is ${ping}ms`;
        }
        return text;
    }
}