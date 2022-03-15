const { Telegraf } = require('telegraf');
require('dotenv').config()
const add = require('./botjs');
const db = require('./datahandling')
//const {getHauki} = require("./botjs");

const {TOKEN, TEAM} = process.env;


const bot = new Telegraf(TOKEN);
const teamUrl = "";
//TODO refactor code duplicates to functions

//TODO Let players find other players hauki left
bot.command('laske', ctx => {
    db.findUser(ctx.message.from.id).then(function (val){
        if(!val){
            /*ctx.reply("Anna pelaajan nimi");
            bot.on('text', cnx => {*/
            let msgArray = ctx.message.text.split(' ');
            msgArray.shift();
            let haettava = msgArray.join(' ');
            if(haettava === ""){
                ctx.reply("Tunnistaudu ensin. /laske omanimi");
                return;
            }
            add.getHauki(haettava, TEAM).then(function (result){
                if(result !== false){
                    ctx.reply(`Sinulla on ${result} haukea.`);
                    const user = {
                        "name": haettava,
                        "id": ctx.message.from.id,
                        "hauet": result,
                    };
                    db.createUser(user)
                }else{
                    ctx.reply("Nimeä ei löytynyt joukkueesta.")


                }
            })

            //});
        }else{
            db.findUser(ctx.message.from.id).then(function (user) {
                //console.log("This is your Telegram userID: " + user)
                db.findHauki(user).then(function (result) {
                    ctx.reply('Haukia jäljellä: ' + result);
                })
            })
        }
    });
});

bot.command('juo', ctx =>{
    /*db.findUser(ctx.message.from.id).then(function (result){
        if(!result){
            ctx.reply("Tunnistaudu ensin. /laske etunimi")
            return;
        }*/
    checkUser(ctx).then(function (result){
        if(!result) return;
        db.juoHauki(ctx.message.from.id).then(function (result){
            if(result){
                ctx.reply('Ryybs');
            }else{
                ctx.reply('Hauet on jo juotu loppuun')
            }
        });
    })



    //});

});

//TODO add hauki from outside NKL
bot.command('lisaa', ctx => {
    checkUser(ctx).then(function (result){
        if(!result) return;

        let msgArray = ctx.message.text.split(' ');
        msgArray.shift();
        let montako = msgArray.join(' ');
        console.log(isNaN(montako * 1))
        if(montako === ""){
            ctx.reply("Montako haukea haluat lisätä. /lisaa [montako]");
            return;
        }else if(isNaN(montako * 1)){
            ctx.reply(`${montako} ei ole numero`)
            return;
        }
        db.lisaaHaukia(ctx.message.from.id, montako).then(function (){
            ctx.reply(`${montako} haukea lisätty`)
        })

    });



})

bot.command('poista', ctx =>{
    db.removeUser(ctx.message.from.id);
    ctx.reply("Käyttäjä poistettu. Käytä [/laske nimi] uudelleen");

});

bot.command('help', ctx => {
    ctx.reply("Aloita botin käyttö kirjoittamalla. '/laske etunimi'\n\n" +
        "Komennot:\n" +
        "/laske - Näyttää jäljellä olevat hauet\n" +
        "/juo - Juo yhden hauen\n" +
        "/poista - Nollaa kaikki tietosi");
})

bot.launch();

const checkUser = function (ctx) {
    return new Promise(function (resolve){
        db.findUser(ctx.message.from.id).then(function (result){
            let isUser = true;
            if(!result){
                ctx.reply("Tunnistaudu ensin. /laske etunimi")
                isUser = false;
            }
            resolve(isUser);
        })
    })
}


//UNUSED COMMANDS/TEMPLATES. WILL BE FIXED OR REMOVED LATER
/*const user = {
    "name": "template",
    "tg": "template",
    "hauet": 0,
};/*

/*bot.start((ctx) =>{
    add.getHauki("Robin").then(function (result) {
        ctx.reply(result);
    })
})*/

/*
bot.command('id', ctx =>{
    ctx.reply(ctx.message.from.id);
});
//FOR NOW USE 'TEAM=[YOUR TEAM ABBREVIATION]' in .env.
//TODO multiple team support
bot.command('joukkue', ctx =>{
    ctx.reply("Anna joukkueen lyhenne");
    bot.on('text', cnx => {
        add.getTeamUrl(cnx.message.text).then(function (result){

        })

    });
});
*/






