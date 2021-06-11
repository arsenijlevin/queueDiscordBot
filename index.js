const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./configs/botConfig.json");
const token = config.token;
const botId = config.botId;
const csgoQueueChannel = config.csgoQueueChannel;

const Utils = require("./utils/utils.js").Utils;
const PartyQueue = require("./utils/partyQueue.js").PartyQueue;

const utils = new Utils(client);

const members = [];

client.on("ready", () => {
  utils.printBotTag();
  utils.printInviteLink();
});

client.on("message", (msg) => {
  if (msg.channel == csgoQueueChannel) {
    if (
      msg.content.toLowerCase().indexOf("в кс идем") != -1 ||
      msg.content.toLowerCase().indexOf("го кс") != -1 ||
      msg.content.toLowerCase().indexOf("го в кс") != -1 ||
      msg.content.toLowerCase().indexOf("кс") != -1
    ) {
      msg.delete();

      partyQueue = new PartyQueue(members);

      msg.channel.send(partyQueue.getAsText()).then((msg) => {
        const filter = (r, u) =>
          (r.emoji.name == "✅" || r.emoji.name == "🆓") && u.id != botId;

        const collector = msg.createReactionCollector(filter, {
          time: 2147483641,
        });

        collector.on("collect", (r, u) => {
          switch (r.emoji.name) {
            case "✅":
              partyQueue.addToQueue({ username: u.id });
              break;
            case "🆓":
              partyQueue.deleteFromQueue({ username: u.id });
              break;
            default:
              break;
          }
          msg.edit(partyQueue.getAsText());
        });

        msg.react("✅");
        msg.react("🆓");
      });
    }
  }
});

client.login(token);
