"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = require("dotenv"); //importa la configuracion de env
dotenv_1.config();
const discord_js_1 = require("discord.js"); //conectarse a discord
const client = new discord_js_1.Client(); //inicializacion de clase
process.env.TOKEN;
