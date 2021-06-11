class Utils {
  constructor(client) {
    this.client = client;
  }
  printInviteLink() {
    this.client
      .generateInvite({
        permissions: ["ADMINISTRATOR"],
      })
      .then((link) => {
        console.log(`Invite link: ${link}`);
      });
  }
  printBotTag() {
    console.log(`Logged in as ${this.client.user.tag}!`);
  }
}

module.exports.Utils = Utils;
