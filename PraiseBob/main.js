
var Discord = require('discord.js');
var auth = require('./auth.json');

// Initialize Discord Bot
var bot = new Discord.Client({});

bot.login(auth.token);
var GeneralChat;
var PraiseBob=true;

bot.on("ready", () => {
  console.log(`Logged in as ${bot.user.tag}!`);

  //set general voice chat
  for(let ch of bot.channels.cache.values()){
    if(ch.type=="voice" && ch.name=="General"){
      GeneralChat =ch;
      break;
    }
  }
})

bot.on('message', message=>{
    var lowerMessage = message.content.toLowerCase();
    //! commands
    if (message.content.substring(0, 1) == '!') {
        var args = message.content.substring(1).split(' ');
        var cmd = args[0].toLowerCase();
        args = args.splice(1);
        switch(cmd) {
            case 'ping':
                message.channel.send("Pong");
                break;
            case 'usa': //kill marx
                GeneralChat.leave();
                break;
            case 'bobpraise':
              for (let k of message.member.roles.cache.values()) {
                if (k.name == "Bob"){
                  message.channel.send("You can't stop this Bob...");
                  break;
                }
                if (k.name=="Not Bob"){
                  PraiseBob=!PraiseBob;
                  if(PraiseBob){
                    message.channel.send("Bob will now be praised as he deserves.");
                  } else {
                    message.channel.send("Bob will be given a break from his praise.");
                  }
                  break;
                }
              }
              break;
            case 'scream':
              GeneralChat.join().then(connection => {
                const dispatcher = connection.play('SCREAM_4.mp3');
                dispatcher.on("end", end => {
                  GeneralChat.leave();
                });
              }).catch(err => console.log(err));
              setTimeout(function(){GeneralChat.leave();},3000)
              break;

            case 'help':
              message.channel.send("bobpraise: Toggle Bob's praise\nping: Pong\nUSA: Stop the USSR\nscream: screams");
              break;
         }
     } else {
       // Praise BOB
       for (let k of message.member.roles.cache.values()) {
         if (k.name=="Bob"){
           message.channel.send("PRAISE BE TO BOB! OUR DEAR LEADER!")
         }
       }
       //love is love
       if(lowerMessage.includes("good bot")){
         message.channel.send(":kissing_heart:");
       }
       //Marx would be proud
       if(lowerMessage.includes("commie") || lowerMessage.includes("communist") || lowerMessage.includes("communism")){
         message.channel.send("PRAISE THE MOTHERLAND",{files:["communist.gif"]});
         GeneralChat.join().then(connection => {
           const dispatcher = connection.play('./soviet-anthem.mp3');
           dispatcher.on("end", end => {
             GeneralChat.leave();
           });
         }).catch(err => console.log(err));
       }//end communism
     }//end else
});
