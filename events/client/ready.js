require('dotenv').config();

module.exports = () =>{
    console.log(`Hello ${process.env.BOT_AUTHOR}, it seems that Kubo-san has loaded successfuly online!`);
}