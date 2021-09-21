

module.exports = {
    cmd_sum : function(argument) {
        let text, sum=0;
        if (argument.length == 0) {
            text = `Please input variable for me to calculate`;
        }else {
            for (let i = 0; i < argument.length; i++) {
                sum += parseInt(argument[i]);
            }
            text = `The total sum is : ${sum}`;
        }
        return text;
    }
}