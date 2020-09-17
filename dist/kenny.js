"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv"); //importa la configuracion de env
dotenv_1.config();
const json = require("./config.json");
const ytld = require("ytdl-core"); //libreria ytdl
const discord_js_1 = require("discord.js"); //conectarse a discord
const client = new discord_js_1.Client(); //inicializacion de clase
const { meme } = require('memejs');
const star = require('star-labs');
const config_json_1 = require("./config.json");
var version = '1.0.0';
client.on('ready', () => {
    var _a, _b;
    console.log('El bot esta activo ' + version);
    (_a = client.user) === null || _a === void 0 ? void 0 : _a.setStatus('online');
    (_b = client.user) === null || _b === void 0 ? void 0 : _b.setActivity("como sos un boludo", {
        type: "WATCHING",
        name: "itt"
    });
});
//comandos del bot
client.on('message', (message) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b, _c, _d;
    console.log(message.content);
    //comando de testeo
    if (message.content.startsWith(config_json_1.prefix + 'ping')) {
        message.channel.send("pong");
        //message.reply("pong")
    }
    if (message.content.startsWith(config_json_1.prefix + 'kick')) {
        if ((_a = message.member) === null || _a === void 0 ? void 0 : _a.hasPermission(['KICK_MEMBERS'])) {
            const user = (_b = message.mentions.members) === null || _b === void 0 ? void 0 : _b.first();
            if (user) {
                const kickedMember = yield user.kick();
                console.log(kickedMember.user.username);
                return message.channel.send(kickedMember + 'Ha sido baneado');
            }
        }
        return message.reply('No tienes los permisos para kickear!');
    }
    /*if (message.content.startsWith(prefix + 'clean')){
        const messages = await message.channel.fetchMessages();
        await message.channel.bulkDelete(messages)
    } */
    if (message.content.startsWith(config_json_1.prefix + 'play')) {
        if (message.channel.type === 'dm')
            return;
        const voiceChannel = (_c = message.member) === null || _c === void 0 ? void 0 : _c.voice.channel;
        const args = message.content.slice(config_json_1.prefix.length).trim().split(' ');
        const command = (_d = args.shift()) === null || _d === void 0 ? void 0 : _d.toLowerCase();
        if (!args)
            return message.channel.send("Necesitas poner un enlace a la musica.");
        if (!voiceChannel) {
            return message.reply("Primero unete a un canal de voz.");
        }
        voiceChannel.join().then(conection => {
            const stream = ytld(args[0], { filter: 'audioonly' });
            const ds = conection.play(stream);
            message.channel.send("Reproduciendo ahora: " + args);
            ds.on('finish', () => voiceChannel.leave());
            process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error)); //error msg
        });
    }
    if (message.content.startsWith(config_json_1.prefix + 'help')) {
        message.channel.send('**' + message.author.username + '**, Revisa tus mensajes privados.');
        message.author.send('**Comandos de KennySan**\n```\n' +
            '-> ' + config_json_1.prefix + 'ping           :: Comprueba la latencia del bot y de tus mensajes.\n' +
            '-> ' + config_json_1.prefix + 'avatar <@user> :: Muestra el avatar de un usuario.\n' +
            '-> ' + config_json_1.prefix + 'decir          :: Hace que el bot diga un mensaje.\n' +
            '-> ' + config_json_1.prefix + 'user <@user>   :: Muestra información sobre un usuario mencioando.\n' +
            '-> ' + config_json_1.prefix + 'server         :: Muestra información del.\n' +
            '-> ' + config_json_1.prefix + 'ban <@user>    :: Banear a un usuario del servidor incluye razon.\n' +
            '-> ' + config_json_1.prefix + 'kick <@user>   :: Patear a un usuario del servidor incluye razon.\n' +
            '-> ' + config_json_1.prefix + 'hola           :: Retorna un saludo como mensaje.\n```\n\n' +
            '-> ' + config_json_1.prefix + 'memes          :: Muestra los mejores memes.\n```\n\n' +
            '-> ' + config_json_1.prefix + 'love           :: Medidor de amor.\n```\n\n' +
            '-> ' + config_json_1.prefix + 'abrazo         :: Es para enviar un abrazo.\n```\n\n' +
            '**KennySan**');
    }
    if (message.content.startsWith(config_json_1.prefix + 'hola')) {
        message.channel.send('Hola **' + message.author.username + '**');
    }
    if (message.content.startsWith(config_json_1.prefix + 'abrazo')) {
        message.delete();
        let aA = message.author;
        let aB = message.mentions.users.first();
        if (!aB)
            return message.channel.send('Menciona a 1 usuario para darle un abrazo.');
        const aC = new discord_js_1.MessageEmbed()
            .setDescription(aA.tag + ' abrazó a ' + aB.tag)
            .setImage(star.hug())
            .setTimestamp();
        message.channel.send(aC);
    }
    if (message.content.startsWith(config_json_1.prefix + 'amor')) {
        const random = Math.floor(Math.random() * 100);
        let heard = "";
        if (random < 50) {
            heard = ':broken_heart:';
        }
        else if (random < 80) {
            heard = ':sparkling_heart: ';
        }
        else if (random < 101) {
            heard = ':heart:';
        }
        const embed = new discord_js_1.MessageEmbed()
            .setAuthor('El porcentaje de amor es:')
            .setDescription(heard + ' ' + random + ' %' + ' ' + heard)
            .setColor(0xff4d4d);
        message.channel.send(embed);
    }
    if (message.content.startsWith(config_json_1.prefix + 'memes')) {
        message.channel.startTyping();
        let memes = ["MemesESP", "spanishmemes", "SpanishMeme", "MemesEnEspanol, shitpost"]; //variable para subreddits esto es para ampliar mas los memes
        let random = Math.floor(Math.random() * memes.length);
        meme(memes[random], function (err, data) {
            if (err) {
                console.error(err);
                message.channel.send('Momento sad\nHubo un error al tratar de buscar memes, intentalo de nuevo ').then(m => m.delete({ timeout: 10000 }));
                message.channel.stopTyping();
                return;
            }
            message.channel.send(data.title, { files: [data.url] })
                .catch(err => {
                message.channel.send('Momento sad\nHubo un error al tratar de buscar memes, intentalo de nuevo ')
                    .then(m => m.delete({ timeout: 10000 }));
                message.channel.stopTyping();
                return;
            });
        });
        message.channel.stopTyping();
    }
}));
client.login(process.env.TOKEN);
const YTAPI = json.YTAPI;
