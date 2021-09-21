// Frequency
function counter (array) {
    let a = array, result = { }
    for (var i = 0; i< a.length; i++) {
        if (!result[a[i]]) result[a[i]] = 0;
        ++result[a[i]];
    }
    return result;
}

// Max and Min
function max_min (array, x) {
    let max, min;
    for (var i in array) {
        if (!max) max=i, min=i;
        if (max < i) max=i;
        if (min > i) min=i;
    }
    if (!x) return parseInt(max-min);
    if (x==1) return parseInt(min);
    if (x==2) return parseInt(max);
}

module.exports = {
    cmd_stats : function(arg) {
        let text= '';
        if (arg != 0) {
            // Fix Array into Integer
            let arr = arg.map(function (x) {return parseInt(x, 10);});

            // Data Values
            let frequency = counter(arr);
            let min = max_min(frequency, 1);
            let max = max_min(frequency, 2);
            let range = Math.ceil(max_min(frequency) / Math.round(1 + 3.3 * Math.log10(arr.length)));

            let points=0;

            for (var i in frequency) {
                if (i <= min + range - 1) {
                    points += frequency[i];
                }else{
                    text += `${min} -> ${min+range-1} = ${points}\n`;
                    min+=range;
                    points=0;
                    points += frequency[i];
                }
                if (i == max) text += `${min} -> ${min+range-1} = ${points}\n`;
            }
        } else {
            text = `Please insert the variable you want to process!`
        }
        return text;
    }
};