/* Codded by @KING QUEEN kingiswa

Telegram: t.me/KING QUEENkingiswa
Facebook: https://www.facebook.com/ravindu.manoj.79

Licensed under the  GPL-3.0 License;
you may not use this file except in compliance with the License.

Whats bot - KING QUEEN kingiswa
*/

const kingisuwa = require('../events');
const {MessageType, MessageOptions, Mimetype} = require('@adiwajshing/baileys');
const axios = require('axios');
const Config = require('../config');
const {spawnSync} = require('child_process');
const fs = require('fs');

const NNVL = "text to image all manu.. වචන රූප බවට පත් කිරීමට යොදාගත හැක"
 if (Config.PSW !== 'isuwaking') {
if (Config.WORKTYPE == 'private') {
     
        kingisuwa.newcmdaddtoking({pattern: 'kingmaker', fromMe: true, disc: NNVL}, (async (message, match) => {
      await message.sendMessage('👑 *' + Config.BOTNAME + ' TEXT MAKER* 👑\n  \n_වචන පින්තූර බවට පත් කිරීමෙ මෙනු ලබා ගැනීමට පහත කමාන්ඩ් භාවිතාකරන්න_\n\n\n\n💠 .1text\n\n💠 .2text\n\n💠 .3text\n\n💠 .4text\n\n💠 .5text\n\n💠 .6text\n\n💠 .7text\n\n💠 .8text\n\n💠 .9text\n\n\n\n\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n... _*ᴘᴏᴡᴇʀᴅ ʙʏ ᴋɪɴɢ ɪꜱᴜᴡᴀ*_ ...\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n')
   }));
   kingisuwa.newcmdaddtoking({pattern: 'king2maker', fromMe: true, dontAdCommandList: true}, (async (message, match) => {
      await message.sendMessage('👑 *' + Config.BOTNAME + ' LOGO MAKER* 👑\n  \n_වචන පින්තූර බවට පත් කිරීමෙ මෙනු ලබා ගැනීමට පහත කමාන්ඩ් භාවිතාකරන්න_\n\n\n\n💠 .1logo\n\n💠 .2logo\n\n💠 .3logo\n\n\n\n\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n... _*ᴘᴏᴡᴇʀᴅ ʙʏ ᴋɪɴɢ ɪꜱᴜᴡᴀ*_ ...\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n')
   }));
}

else if (Config.WORKTYPE == 'public') {

     kingisuwa.newcmdaddtoking({pattern: 'kingmaker', fromMe: false, dontAdCommandList: true}, (async (message, match) => {
      await message.sendMessage('👑 *' + Config.BOTNAME + ' TEXT MAKER* 👑\n  \n_වචන පින්තූර බවට පත් කිරීමෙ මෙනු ලබා ගැනීමට පහත කමාන්ඩ් භාවිතාකරන්න_\n\n\n\n💠 .1text\n\n💠 .2text\n\n💠 .3text\n\n💠 .4text\n\n💠 .5text\n\n💠 .6text\n\n💠 .7text\n\n💠 .8text\n\n💠 .9text\n\n\n\n\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n... _*ᴘᴏᴡᴇʀᴅ ʙʏ ᴋɪɴɢ ɪꜱᴜᴡᴀ*_ ...\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n')
   }));
   kingisuwa.newcmdaddtoking({pattern: 'king2maker', fromMe: false, disc: NNVL}, (async (message, match) => {
      await message.sendMessage('👑 *' + Config.BOTNAME + ' LOGO MAKER* 👑\n  \n_වචන පින්තූර බවට පත් කිරීමෙ මෙනු ලබා ගැනීමට පහත කමාන්ඩ් භාවිතාකරන්න_\nමෙම කමාන්ඩ් අන්ලිමිටඩ් උවද වෙබ්සයිට් එකකින් ලබා ගන්නා බැවින් සමහර විට ක්‍රියා නොකිරීමට හැකිය\n\n\n\n💠 .1logo\n\n💠 .2logo\n\n💠 .3logo\n\n\n\n\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n... _*ᴘᴏᴡᴇʀᴅ ʙʏ ᴋɪɴɢ ɪꜱᴜᴡᴀ*_ ...\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n')
   }));
      kingisuwa.newcmdaddtoking({pattern: 'king3maker', fromMe: false, disc: NNVL}, (async (message, match) => {
      await message.sendMessage('👑 *' + Config.BOTNAME + 'Best LOGO MAKER* 👑\n  \n_වචන පින්තූර බවට පත් කිරීමෙ මෙනු ලබා ගැනීමට පහත කමාන්ඩ් භාවිතාකරන්න_\n\n\n\n💠 .1best\n\n\n\n\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n... _*ᴘᴏᴡᴇʀᴅ ʙʏ ᴋɪɴɢ ɪꜱᴜᴡᴀ*_ ...\n· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·· ··÷¦÷·· ·\n')
   }));
   

}
}
