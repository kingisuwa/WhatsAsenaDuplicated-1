/* Copyright (C) 2020 Yusuf Usta.

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

кιηg qυєєη - Yusuf Usta
*/

const fs = require("fs");
const path = require("path");
const events = require("./events");
const chalk = require('chalk');
const config = require('./config');
const {WAConnection, MessageOptions, MessageType, Mimetype, Presence} = require('@adiwajshing/baileys');
const {Message, StringSession, Image, Video} = require('./whatsasena/');
const { DataTypes } = require('sequelize');
const { GreetingsDB, getMessage } = require("./plugins/sql/greetings");
const got = require('got');

// Sql
const WhatsAsenaDB = config.DATABASE.define('WhatsAsenaDuplicated', {
    info: {
      type: DataTypes.STRING,
      allowNull: false
    },
    value: {
        type: DataTypes.TEXT,
        allowNull: false
    }
});

fs.readdirSync('./plugins/sql/').forEach(plugin => {
    if(path.extname(plugin).toLowerCase() == '.js') {
        require('./plugins/sql/' + plugin);
    }
});

const plugindb = require('./plugins/sql/plugin');

// Yalnızca bir kolaylık. https://stackoverflow.com/questions/4974238/javascript-equivalent-of-pythons-format-function //
String.prototype.format = function () {
    var i = 0, args = arguments;
    return this.replace(/{}/g, function () {
      return typeof args[i] != 'undefined' ? args[i++] : '';
    });
};

if (!Date.now) {
    Date.now = function() { return new Date().getTime(); }
}

Array.prototype.remove = function() {
    var what, a = arguments, L = a.length, ax;
    while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
            this.splice(ax, 1);
        }
    }
    return this;
};

async function whatsAsena () {
    await config.DATABASE.sync();
    var StrSes_Db = await WhatsAsenaDB.findAll({
        where: {
          info: 'StringSession'
        }
    });
    
    const conn = new WAConnection();
    const Session = new StringSession();

    conn.logger.level = config.DEBUG ? 'debug' : 'warn';
    var nodb;

    if (StrSes_Db.length < 1) {
        nodb = true;
        conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
    } else {
        conn.loadAuthInfo(Session.deCrypt(StrSes_Db[0].dataValues.value));
    }

    conn.on ('credentials-updated', async () => {
        console.log(
            chalk.blueBright.italic('✅ ඉන්න මද වෙලවක් සම්බන්ද වෙමින්')
        );

        const authInfo = conn.base64EncodedAuthInfo();
        if (StrSes_Db.length < 1) {
            await WhatsAsenaDB.create({ info: "StringSession", value: Session.createStringSession(authInfo) });
        } else {
            await StrSes_Db[0].update({ value: Session.createStringSession(authInfo) });
        }
    })    

    conn.on('connecting', async () => {
        console.log(`${chalk.green.bold('Whats')}${chalk.blue.bold('Asena')}
${chalk.white.bold('Version:')} ${chalk.red.bold(config.VERSION)}

${chalk.blue.italic('ℹ️ Connecting to WhatsApp... 😋 පොඩ්ඩයි .')}`);
    });
    

    conn.on('open', async () => {
        console.log(
            chalk.green.bold('✅ සම්බන්ද වෙමින් K͓̽I͓̽N͓̽G͓̽ Q͓̽U͓̽E͓̽E͓̽N͓̽')
        );

        console.log(
            chalk.blueBright.italic('⬇️ Installing සොයමින් සිටි Plugins...')
        );

        var plugins = await plugindb.PluginDB.findAll();
        plugins.map(async (plugin) => {
            if (!fs.existsSync('./plugins/' + plugin.dataValues.name + '.js')) {
                console.log(plugin.dataValues.name);
                var response = await got(plugin.dataValues.url);
                if (response.statusCode == 200) {
                    fs.writeFileSync('./plugins/' + plugin.dataValues.name + '.js', response.body);
                    require('./plugins/' + plugin.dataValues.name + '.js');
                }     
            }
        });

        console.log(
            chalk.blueBright.italic('⬇️  සාර්ටකයි ඔබෙ බෝට්...')
        );

        fs.readdirSync('./plugins').forEach(plugin => {
            if(path.extname(plugin).toLowerCase() == '.js') {
                require('./plugins/' + plugin);
            }
        });

        console.log(
            chalk.green.bold('✅ දැන් ඔබට බවිතා කර ගැකිය⛧☸✹')
        );
        await new Promise(r => setTimeout(r, 1100));

        if (config.WORKTYPE == 'public') {
            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                await conn.sendMessage(conn.user.jid, '*кιηg qυєєη ප්‍රසිද්ධියේ ක්‍රියා කරයි! 🐺 * \n\n_කරුණාකර මෙහි ප්ලගිනය කිරීමට උත්සාහ නොකරන්න. මෙය ඔබගේ LOG අංකයයි ._\n_ඔබට ඕනෑම සංවාදයකදී ගමනාගමන උත්සාහ කළ හැක :) සංසන්දනය කිරීම සඳහා කරුණාකර config vars හි "WORK_TYPE" යතුර වසා දමන්න. * \n\n * кιηg qυєєη භාවිතා කිරීම ගැන ස්තූතියි 💌*', MessageType.text);
            }
            else {
                await conn.sendMessage(conn.user.jid, '*кιηg qυєєη මහජනයා ලෙස වැඩ කිරීම! ☸✹☸☮*\n\n_කරුණාකර මෙහි ප්ලගීන උත්සාහ නොකරන්න. මෙය ඔබගේ LOG අංකයයි._\n_ඔබට ඕනෑම කතාබහකට විධාන උත්සාහ කළ හැක :)_\n\n*ඔබේ බොට් පොදු ලෙස ක්‍රියා කරයි. එය වෙනස් කිරීමට, config vars තුළ “WORK_TYPE” ස්විචය “පුද්ගලික” කරන්න.*\n\n*кιηg qυєєη භාවිතා කිරීම ගැන ස්තුතියි 💠❀*', MessageType.text);
            }
        }
        else if (config.WORKTYPE == 'private') {
            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                await conn.sendMessage(conn.user.jid, '*кιηg qυєєη Private Olarak Çalışıyor! 🐺*\n\n_Lütfen burada plugin denemesi yapmayın. Burası sizin LOG numaranızdır._\n_Herhangi bir sohbette komutları deneyebilirsiniz :)_\n\n*Botunuz sadece size özel olarak çalışmaktadır. Değiştirmek için config vars üzerinden “WORK_TYPE” anahtarını “public” yapın.*\n\n*кιηg qυєєη Kullandığın İçin Teşekkürler 💌*', MessageType.text);
            }
            else {
                await conn.sendMessage(conn.user.jid, '*кιηg qυєєη පුද්ගලිකව වැඩ! 😋☸⛧💠☸:*\n\n_කරුණාකර මෙහි ප්ලගීන උත්සාහ නොකරන්න. මෙය ඔබගේ LOG අංකයයි._\n_ඔබට ඕනෑම කතාබහකට විධාන උත්සාහ කළ හැක :)_\n\n*ඔබේ බොට් පුද්ගලික ලෙස ක්‍රියා කරයි. එය වෙනස් කිරීමට, config vars හි “WORK_TYPE” ස්විචය “පොදු” කරන්න.*\n\n*кιηg qυєєη භාවිතා කිරීම ගැන ස්තුතියි 💠❀*', MessageType.text);
            }
        }
        else {
            return console.log('Wrong WORK_TYPE key! Please use “private” or “public”')
        }
    });
    
    conn.on('message-new', async msg => {
        if (msg.key && msg.key.remoteJid == 'status@broadcast') return;

        if (config.NO_ONLINE) {
            await conn.updatePresence(msg.key.remoteJid, Presence.unavailable);
        }

        if (msg.messageStubType === 32 || msg.messageStubType === 28) {
            // Görüşürüz Mesajı
            var gb = await getMessage(msg.key.remoteJid, 'goodbye');
            if (gb !== false) {
                await conn.sendMessage(msg.key.remoteJid, gb.message, MessageType.text);
            }
            return;
        } else if (msg.messageStubType === 27 || msg.messageStubType === 31) {
            // Hoşgeldin Mesajı
            var gb = await getMessage(msg.key.remoteJid);
            if (gb !== false) {
                await conn.sendMessage(msg.key.remoteJid, gb.message, MessageType.text);
            }
            return;
        }

        events.commands.map(
            async (command) =>  {
                if (msg.message && msg.message.imageMessage && msg.message.imageMessage.caption) {
                    var text_msg = msg.message.imageMessage.caption;
                } else if (msg.message && msg.message.videoMessage && msg.message.videoMessage.caption) {
                    var text_msg = msg.message.videoMessage.caption;
                } else if (msg.message) {
                    var text_msg = msg.message.extendedTextMessage === null ? msg.message.conversation : msg.message.extendedTextMessage.text;
                } else {
                    var text_msg = undefined;
                }

                if ((command.on !== undefined && (command.on === 'image' || command.on === 'photo')
                    && msg.message && msg.message.imageMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg)))) || 
                    (command.pattern !== undefined && command.pattern.test(text_msg)) || 
                    (command.on !== undefined && command.on === 'text' && text_msg) ||
                    // Video
                    (command.on !== undefined && (command.on === 'video')
                    && msg.message && msg.message.videoMessage !== null && 
                    (command.pattern === undefined || (command.pattern !== undefined && 
                        command.pattern.test(text_msg))))) {

                    let sendMsg = false;
                    var chat = conn.chats.get(msg.key.remoteJid)
                        
                    if ((config.SUDO !== false && msg.key.fromMe === false && command.fromMe === true &&
                        (msg.participant && config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.participant.split('@')[0]) : msg.participant.split('@')[0] == config.SUDO || config.SUDO.includes(',') ? config.SUDO.split(',').includes(msg.key.remoteJid.split('@')[0]) : msg.key.remoteJid.split('@')[0] == config.SUDO)
                    ) || command.fromMe === msg.key.fromMe || (command.fromMe === false && !msg.key.fromMe)) {
                        if (command.onlyPinned && chat.pin === undefined) return;
                        if (!command.onlyPm === chat.jid.includes('-')) sendMsg = true;
                        else if (command.onlyGroup === chat.jid.includes('-')) sendMsg = true;
                    }
    
                    if (sendMsg) {
                        if (config.SEND_READ && command.on === undefined) {
                            await conn.chatRead(msg.key.remoteJid);
                        }
                        
                        var match = text_msg.match(command.pattern);
                        
                        if (command.on !== undefined && (command.on === 'image' || command.on === 'photo' )
                        && msg.message.imageMessage !== null) {
                            whats = new Image(conn, msg);
                        } else if (command.on !== undefined && (command.on === 'video' )
                        && msg.message.videoMessage !== null) {
                            whats = new Video(conn, msg);
                        } else {
                            whats = new Message(conn, msg);
                        }

                        if (command.deleteCommand && msg.key.fromMe) {
                            await whats.delete(); 
                        }

                        try {
                            await command.function(whats, match);
                        } catch (error) {
                            if (config.LANG == 'TR' || config.LANG == 'AZ') {
                                await conn.sendMessage(conn.user.jid, '*-- HATA RAPORU [WHATSASENA] --*' + 
                                    '\n*кιηg qυєєη bir hata gerçekleşti!*'+
                                    '\n_Bu hata logunda numaranız veya karşı bir tarafın numarası olabilir. Lütfen buna dikkat edin!_' +
                                    '\n_Yardım için Telegram grubumuza yazabilirsiniz._' +
                                    '\n_Bu mesaj sizin numaranıza (kaydedilen mesajlar) gitmiş olmalıdır._' +
                                    '\n_Hatayı https://chat.whatsapp.com/JjvOISnxu4z6sv4hx3FBNQ bu gruba iletebilirsiniz._\n\n' +
                                    '*Gerçekleşen Hata:* ```' + error + '```\n\n'
                                    , MessageType.text, {detectLinks: false});
                            } else {
                                await conn.sendMessage(conn.user.jid, '*-- ERROR REPORT [WHATSASENA] --*' + 
                                    '\n*кιηg qυєєη an error has occurred!*'+
                                    '\n_This error log may include your number or the number of an opponent. Please be careful with it!_' +
                                    '\n_You can write to our Telegram group for help._' +
                                    '\n_This message should have gone to your number (saved messages)._\n\n' +
                                    '*Error:* ```' + error + '```\n\n'
                                    , MessageType.text);
                            }
                        }
                    }
                }
            }
        )
    });

    try {
        await conn.connect();
    } catch {
        if (!nodb) {
            console.log(chalk.red.bold('Eski sürüm stringiniz yenileniyor...'))
            conn.loadAuthInfo(Session.deCrypt(config.SESSION)); 
            try {
                await conn.connect();
            } catch {
                return;
            }
        }
    }
}

whatsAsena();
