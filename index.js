const { Client } = require('discord.js');
const config = require('./config.json');

const INVITE_REGEX = /discord(?:\.com|app\.com|\.gg)(\/invite\/|\/)(?:[a-zA-Z0-9\-]+)/gim;
const URL_REGEX = /(discord.gg\/|discord.com\/invite\/|discordapp.com\/invite\/)/gim;

const client = new Client({ checkUpdate: false });

client.on('ready', () => {
  console.log(`[*] Ready as ${client.user.tag}`);
});

client.on('messageCreate', async (msg) => {
  if (msg.bot || !msg.content) return;

  const invites = msg.content.match(INVITE_REGEX);
  if (!invites?.length) return;

  for (const invite of invites) {
    const code = invite.replace(URL_REGEX, '');

    try {
      const instance = await client.fetchInvite(code);

      if (config.whitelistOnly && !config.guilds.includes(info.guild.id)) {
        continue;
      }

      try {
        await instance.acceptInvite(true, config.alt);
        console.log(`[*] Accepted invite ${instance.code} to ${instance.guild.name}.`);
      } catch (e) {
        console.error(`[!] Failed to accept invite ${instance.code} to ${instance.guild.name}.`);
      }
    } catch {
      continue;
    }
  }
});

client.login(config.token);
