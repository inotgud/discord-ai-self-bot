
const { Client, GatewayIntentBits } = require('discord.js-selfbot-v13');
const { CohereClient } = require('cohere-ai');

// initialize discord client
const client = new Client({});

client.on("ready", () => {
  console.log("Selfbot started!");
});

const channelID = ""; //replace with channel id

// replace with your actual Cohere API token
const cohere = new CohereClient({
  token: "",
});

const ignoredUserId = ""; //your user id

let lastMessageTimestamp = 0; //message timestamp

// event listener for when a message is created
client.on('messageCreate', async message => {
  if (message.author.bot || message.author.id === ignoredUserId) return;

  const currentTime = Date.now();
  if (currentTime - lastMessageTimestamp < 5000) return;

  if (message.channel.id === channelID) {
    try {
      lastMessageTimestamp = currentTime; // update the timestamp
      const response = await cohere.chat({
        message: message.content,
      });

      console.log(response.text);

      await message.reply(response.text.trim());
    } catch (error) {
      console.error("Error handling message:", error);
      await message.reply("Sorry, I couldn't process your request."); //error message
    }
  }
});

// replace with your discord token
client.login(""); 
