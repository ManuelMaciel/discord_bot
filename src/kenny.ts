import {config} from 'dotenv' //importa la configuracion de env
config();
const json = require("./config.json");
import ytld = require('ytdl-core') //libreria ytdl

import {Client, Message, Channel, MessageEmbed} from 'discord.js' //conectarse a discord
const client: Client = new Client() //inicializacion de clase

const { meme } = require('memejs')

const star = require('star-labs')

import {prefix} from './config.json'

var version = '1.0.0'

client.on('ready', () => { //stado del bot
    console.log('El bot esta activo '+version)
    client.user?.setStatus('online')
    client.user?.setActivity("como sos un boludo", {
        type: "WATCHING",
        name: "itt"
      });
}
) 


//comandos del bot
client.on('message', async(message: Message) => {
    console.log(message.content)

    //comando de testeo
    if (message.content.startsWith(prefix + 'ping')){
        message.channel.send("pong")
        //message.reply("pong")
    }

    if (message.content.startsWith(prefix + 'kick')){
        if(message.member?.hasPermission(['KICK_MEMBERS'])){
            const user = message.mentions.members?.first();
                if(user){
                const kickedMember = await user.kick();
                console.log(kickedMember.user.username)
                return message.channel.send(kickedMember + 'Ha sido baneado')
            }
        }
        return message.reply('No tienes los permisos para kickear!')
    }

    /*if (message.content.startsWith(prefix + 'clean')){
        const messages = await message.channel.fetchMessages();
        await message.channel.bulkDelete(messages)
    } */

    if(message.content.startsWith(prefix + 'play')){
        if(message.channel.type === 'dm') return;

        const voiceChannel = message.member?.voice.channel;

        const args = message.content.slice(prefix.length).trim().split(' ');
        const command = args.shift()?.toLowerCase()
        if(!args) return message.channel.send("Necesitas poner un enlace a la musica.")
        if(!voiceChannel){
            return message.reply("Primero unete a un canal de voz.");
        }
        voiceChannel.join().then(conection =>{
            const stream = ytld(args[0], { filter: 'audioonly'})
            const ds = conection.play(stream)
            message.channel.send("Reproduciendo ahora: "+args)

            ds.on('finish', () => voiceChannel.leave());

            process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error)); //error msg
        })
    }
    if(message.content.startsWith(prefix + 'help')){

        message.channel.send('**'+message.author.username+'**, Revisa tus mensajes privados.');
        message.author.send('**Comandos de KennySan**\n```\n'+
                            '-> '+prefix+'ping           :: Comprueba la latencia del bot y de tus mensajes.\n'+
                            '-> '+prefix+'avatar <@user> :: Muestra el avatar de un usuario.\n'+
                            '-> '+prefix+'decir          :: Hace que el bot diga un mensaje.\n'+
                            '-> '+prefix+'user <@user>   :: Muestra información sobre un usuario mencioando.\n'+
                            '-> '+prefix+'server         :: Muestra información del.\n'+
                            '-> '+prefix+'ban <@user>    :: Banear a un usuario del servidor incluye razon.\n'+
                            '-> '+prefix+'kick <@user>   :: Patear a un usuario del servidor incluye razon.\n'+
                            '-> '+prefix+'hola           :: Retorna un saludo como mensaje.\n```\n\n'+
                            '-> '+prefix+'memes          :: Muestra los mejores memes.\n```\n\n'+
                            '-> '+prefix+'love           :: Medidor de amor.\n```\n\n'+
                            '-> '+prefix+'abrazo         :: Es para enviar un abrazo.\n```\n\n'+
                            '**KennySan**');
        
      }
    if(message.content.startsWith(prefix+'hola')){
        message.channel.send('Hola **'+message.author.username+'**')
    }

    if(message.content.startsWith(prefix+'abrazo')){
        message.delete()
        let aA = message.author
        let aB = message.mentions.users.first()
        if(!aB) return message.channel.send('Menciona a 1 usuario para darle un abrazo.')
        const aC = new MessageEmbed()
        .setDescription(aA.tag+' abrazó a '+aB.tag)
    .setImage(star.hug())
    .setTimestamp();
	message.channel.send(aC);
    }
    if(message.content.startsWith(prefix+'amor')){
        const random = Math.floor(Math.random() * 100);
let heard = "";
 
    if(random < 50){
        heard=':broken_heart:';

    }else if(random < 80){
        heard=':sparkling_heart: ';

    }else if(random < 101){
        heard=':heart:';

    }

    const embed = new MessageEmbed()
    .setAuthor('El porcentaje de amor es:')
    .setDescription(heard+' '+random+' %'+' '+heard)
    .setColor(0xff4d4d)
    message.channel.send(embed)
    }
    


    if(message.content.startsWith(prefix+'memes')){
        message.channel.startTyping()
        let memes = ["MemesESP", "spanishmemes", "SpanishMeme", "MemesEnEspanol, shitpost"]//variable para subreddits esto es para ampliar mas los memes
        let random = Math.floor(Math.random() * memes.length)
        meme(memes[random], function(err:any,data:any) {
            if (err) {
                console.error(err)
                message.channel.send('Momento sad\nHubo un error al tratar de buscar memes, intentalo de nuevo ').then(m => m.delete({ timeout: 10000 }))
                message.channel.stopTyping()
                return
            }
            message.channel.send(data.title, { files: [data.url] })
                .catch(err => {//por si hay otro error
                    message.channel.send('Momento sad\nHubo un error al tratar de buscar memes, intentalo de nuevo ')
                        .then(m => m.delete({ timeout: 10000 }))
                    message.channel.stopTyping()
                    return
                })
        })
        message.channel.stopTyping()
    }
}
)

client.login(process.env.TOKEN);
const YTAPI = json.YTAPI;