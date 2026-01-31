module.exports = {
  config: {
    name: "help",
    aliases: ["menu", "h", "commands"],
    version: "3.5 • ALPHA AI EDITION",
    author: "Cid",
    shortDescription: "Alpha AI command interface",
    longDescription: "ALPHA AI Edition — A premium, intelligent, system-level command menu.",
    category: "system",
    guide: "{pn}help [command name]"
  },

  onStart: async function ({ message, args, prefix, event }) {
    const { commands, usersData } = global.GoatBot;
    const { senderID } = event;

    /* ──────────────── 1. FANCY FONT ENGINE ──────────────── */
    const toFancy = (str) => {
      const map = {
        A:"𝐀",B:"𝐁",C:"𝐂",D:"𝐃",E:"𝐄",F:"𝐅",G:"𝐆",H:"𝐇",I:"𝐈",
        J:"𝐉",K:"𝐊",L:"𝐋",M:"𝐌",N:"𝐍",O:"𝐎",P:"𝐏",Q:"𝐐",R:"𝐑",
        S:"𝐒",T:"𝐓",U:"𝐔",V:"𝐕",W:"𝐖",X:"𝐗",Y:"𝐘",Z:"𝐙",
        a:"𝐚",b:"𝐛",c:"𝐜",d:"𝐝",e:"𝐞",f:"𝐟",g:"𝐠",h:"𝐡",i:"𝐢",
        j:"𝐣",k:"𝐤",l:"𝐥",m:"𝐦",n:"𝐧",o:"𝐨",p:"𝐩",q:"𝐪",r:"𝐫",
        s:"𝐬",t:"𝐭",u:"𝐮",v:"𝐯",w:"𝐰",x:"𝐱",y:"𝐲",z:"𝐳"
      };
      return str.replace(/[A-Za-z]/g, c => map[c] || c);
    };

    /* ──────────────── 2. CATEGORY EMOJIS ──────────────── */
    const categoryEmojis = {
      ai: "🧠",
      "ai-image": "🎨",
      system: "⚙️",
      fun: "🎭",
      group: "👥",
      owner: "👑",
      admin: "🛡️",
      config: "🧩",
      economy: "💰",
      media: "🎬",
      tools: "🧰",
      utility: "🔌",
      info: "ℹ️",
      image: "🖼️",
      game: "🎮",
      rank: "🏆",
      boxchat: "💬",
      "18+": "🔞",
      others: "📂"
    };

    /* ──────────────── 3. BUILD COMMAND DATA ──────────────── */
    const categories = {};
    let totalCommands = 0;

    const cleanCategory = (text) =>
      text
        ? text.normalize("NFKD").replace(/[^\w\s-]/g, "").toLowerCase()
        : "others";

    for (const [, cmd] of commands) {
      const cat = cleanCategory(cmd.config.category);
      if (!categories[cat]) categories[cat] = [];
      categories[cat].push(cmd.config.name);
      totalCommands++;
    }

    /* ──────────────── 4. SINGLE COMMAND VIEW ──────────────── */
    if (args[0]) {
      const query = args[0].toLowerCase();
      const cmd =
        commands.get(query) ||
        [...commands.values()].find(c =>
          (c.config.aliases || []).includes(query)
        );

      if (!cmd)
        return message.reply(`⛔ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 "${query}" 𝐍𝐎𝐓 𝐅𝐎𝐔𝐍𝐃`);

      const {
        name,
        version,
        author,
        guide,
        category,
        shortDescription,
        aliases,
        role
      } = cmd.config;

      const roleText =
        role === 2 ? "OWNER" : role === 1 ? "ADMIN" : "USER";

      const usage = guide
        ? guide.replace(/{pn}/g, prefix)
        : `${prefix}${name}`;

      return message.reply(
        `╔════ 𝐂𝐎𝐌𝐌𝐀𝐍𝐃 𝐃𝐀𝐓𝐀 ════╗\n\n` +
        `▸ 𝐍𝐚𝐦𝐞        : ${toFancy(name.toUpperCase())}\n` +
        `▸ 𝐂𝐚𝐭𝐞𝐠𝐨𝐫𝐲    : ${categoryEmojis[category] || "📂"} ${toFancy(category || "Unknown")}\n` +
        `▸ 𝐃𝐞𝐬𝐜𝐫𝐢𝐩𝐭𝐢𝐨𝐧 : ${shortDescription}\n` +
        `▸ 𝐀𝐥𝐢𝐚𝐬𝐞𝐬     : ${aliases?.join(", ") || "None"}\n` +
        `▸ 𝐂𝐥𝐞𝐚𝐫𝐚𝐧𝐜𝐞   : ${roleText}\n` +
        `▸ 𝐀𝐮𝐭𝐡𝐨𝐫      : ${author}\n` +
        `▸ 𝐕𝐞𝐫𝐬𝐢𝐨𝐧     : ${version}\n` +
        `▸ 𝐔𝐬𝐚𝐠𝐞       : ${usage}\n\n` +
        `╚════════════════════╝`
      );
    }

    /* ──────────────── 5. USER NAME SAFE FETCH ──────────────── */
    let userName = "Member";
    try {
      if (usersData?.get) {
        const user = await usersData.get(senderID);
        if (user?.name) userName = user.name;
      }
    } catch {}

    /* ──────────────── 6. MAIN ALPHA MENU ──────────────── */
    let msg = "";
    msg += `╔══════════════════╗\n`;
    msg += `║     ☁️ 𝐀𝐋𝐏𝐇𝐀 𝐀𝐈 𝐂𝐎𝐑𝐄 ☁️    ║\n`;
    msg += `╚══════════════════╝\n`;
    msg += `👋 𝐖𝐞𝐥𝐜𝐨𝐦𝐞, ${toFancy(userName)}\n`;
    msg += `🧠 𝐂𝐨𝐦𝐦𝐚𝐧𝐝𝐬: ${totalCommands}  |  🏷️ 𝐏𝐫𝐞𝐟𝐢𝐱: [ ${prefix} ]\n`;
    msg += `─────────────────────\n`;

    for (const cat of Object.keys(categories).sort()) {
      if (!categories[cat].length) continue;
      const emoji = categoryEmojis[cat] || "📂";
      const title = toFancy(cat.toUpperCase());
      const list = categories[cat].map(c => `⭓ ${c}`).join("  ");

      msg += `\n╭── 『 ${emoji} ${title} 』\n`;
      msg += `│ ${list}\n`;
      msg += `╰───────────────◊\n`;
    }

    msg += `\n╭───────────────────╮\n`;
    msg += `│ 💡 𝐓𝐲𝐩𝐞: ${prefix}𝐡𝐞𝐥𝐩 <𝐜𝐦𝐝>\n`;
    msg += `│    𝐟𝐨𝐫 𝐜𝐨𝐦𝐦𝐚𝐧𝐝 𝐝𝐚𝐭𝐚\n`;
    msg += `╰────────────────────╯\n`;
    msg += `🧬 𝐏𝐨𝐰𝐞𝐫𝐞𝐝 𝐛𝐲 𝐀𝐋𝐏𝐇𝐀 𝐀𝐈`;

    return message.reply(msg);
  }
};
