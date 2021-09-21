

module.exports = {
    cmd_say : function(argument) {
        let text;
        if (argument.length == 0) {
            text = `Please input a string of line to print out`;
        }else {
            text = `${argument.join(' ')}`;
        }
        return text;
    }
}