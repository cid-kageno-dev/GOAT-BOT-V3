/cmd install prefix.js const fs = require("fs-extra");
const { utils } = global;

module.exports = {
  config: {
    name: "prefix",
    version: "1.5 • ALPHA AI EDITION",
    author: "Cid Kageno",
    countDown: 5,
    role: 0,
    description: "Change the bot's command prefix in this chat or system-wide (admin only).",
    category: "config"
  },

  langs: {
    en: {
      reset: "✅ Prefix has been reset to default: %1",
      onlyAdmin: "⚠️ Only admins can change the system-wide prefix",
      confirmGlobal: "⚡ React to this message to confirm changing the system-wide prefix",
      confirmThisThread: "⚡ React to this message to confirm changing the prefix in this chat",
      successGlobal: "✅ System-wide prefix updated: %1",
      successThisThread: "✅ Chat prefix updated: %1",
      myPrefix: "👋 Hey %1!\n➥ 🌐 Global: %2\n➥ 💬 This Chat: %3\n🤖 Alpha AI at your service 🫡"
    }
  },

  // Fancy font for Alpha edition
  toFancy: function(str) {
    const map = {
      A:"𝐀",B:"𝐁",C:"𝐂",D:"𝐃",E:"𝐄",F:"𝐅",G:"𝐆",H:"𝐇",I:"𝐈",
      J:"𝐉",K:"𝐊",L:"𝐋",M:"𝐌",N:"𝐍",O:"𝐎",P:"𝐏",Q:"𝐐",R:"𝐑",
      S:"𝐒",T:"𝐓",U:"𝐔",V:"𝐕",W:"𝐖",X:"𝐗",Y:"𝐘",Z:"𝐙",
      a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",h:"𝐡",i:"𝐢",
      j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",n:"𝐧",o:"𝐨",p:"𝐩",q:"𝐪",r:"𝐫",
      s:"𝐬",t:"𝐭",u:"𝐮",v:"𝐯",w:"𝐰",x:"𝐱",y:"𝐲",z:"𝐳"
    };
    return str.replace(/[A-Za-z]/g, c => map[c] || c);
  },

  onStart: async function({ message, role, args, commandName, event, threadsData, getLang }) {
    if (!args[0]) return message.SyntaxError();

    // Reset prefix
    if (args[0].toLowerCase() === "reset") {
      await threadsData.set(event.threadID, null, "data.prefix");
      return message.reply(getLang("reset", global.GoatBot.config.prefix));
    }

    const newPrefix = args[0];
    const setGlobal = args[1] === "-g";
    if (setGlobal && role < 2) return message.reply(getLang("onlyAdmin"));

    const formSet = { commandName, author: event.senderID, newPrefix, setGlobal };

    // Confirm via reaction
    return message.reply(
      setGlobal ? getLang("confirmGlobal") : getLang("confirmThisThread"),
      (err, info) => {
        formSet.messageID = info.messageID;
        global.GoatBot.onReaction.set(info.messageID, formSet);
      }
    );
  },

  onReaction: async function({ message, threadsData, event, Reaction, getLang }) {
    const { author, newPrefix, setGlobal } = Reaction;
    if (event.userID !== author) return;

    if (setGlobal) {
      global.GoatBot.config.prefix = newPrefix;
      fs.writeFileSync(global.client.dirConfig, JSON.stringify(global.GoatBot.config, null, 2));
      return message.reply(getLang("successGlobal", newPrefix));
    } else {
      await threadsData.set(event.threadID, newPrefix, "data.prefix");
      return message.reply(getLang("successThisThread", newPrefix));
    }
  },

  onChat: async function({ event, message, getLang, usersData }) {
    if (!event.body || event.body.toLowerCase() !== "prefix") return;

    // Fetch username
    let userName = "Member";
    try {
      const user = await usersData.get(event.senderID);
      if (user?.name) userName = user.name;
    } catch {}

    const botName = global.GoatBot.config.nickNameBot || "Alpha AI";

    // Display fancy Alpha header
    const msg =
      `╭───────────────╮\n` +
      `│ ☁️ 𝐀𝐋𝐏𝐇𝐀 𝐀𝐈 𝐂𝐎𝐑𝐄 ☁️ │\n` +
      `╰───────────────╯\n` +
      `👋 Welcome, ${this.toFancy(userName)}!\n` +
      `🧠 Global Prefix: [ ${global.GoatBot.config.prefix} ]\n` +
      `💬 Chat Prefix: [ ${utils.getPrefix(event.threadID)} ]\n` +
      `────────────────────────────\n` +
      `💡 Type "${utils.getPrefix(event.threadID)}<command>" to use a command\n` +
      `🤖 Alpha AI at your service 🫡`;

    return message.reply(msg);
  }
};
