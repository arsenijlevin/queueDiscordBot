const Queue = require("./queue.js").Queue;

class PartyQueue extends Queue {
  constructor(members) {
    super(members);
  }

  getAsText() {
    let text = "@here\n\n**Забив слотов на CS:GO**\n\n✅ - забить слот\n🆓 - освободить слот\n\n";
    

    let i = 1;
    let emoji = ":white_check_mark:";
    let memberText = "";

    this.queue.forEach((member) => {
      
      if (member.username != "undefined") {
        if (i > 5) {
          emoji = ":clock3:";
        }
        memberText = `<@${member.username}>`;
      } else {
        emoji = ":free:";
        memberText = `-`;
      }
      text += `${emoji} ${i}) *${memberText}*\n`;
      i++;
    });

    for (let j = i-1; j < this.counter; j++) {
      emoji = i > 5 ? ":clock3:" : ":free:";
      memberText = "-";
      text += `${emoji} ${j+1}) *${memberText}*\n`;
    }
    
   
    return text;
  }
}

module.exports.PartyQueue = PartyQueue;
