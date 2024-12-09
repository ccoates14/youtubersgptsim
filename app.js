import OpenAI from 'openai';
import express from 'express';
import cors from 'cors';

const client = new OpenAI({
  apiKey: process.env['OPENAI_API_KEY'], // This is the default and can be omitted
});

const app = express();
app.use(express.json());
app.use(cors());

app.use(cors({
    origin: 'http://localhost:8080',  // Replace with your frontend URL
  }));

const port = 3000;


const williamosmanphoto = "https://yt3.googleusercontent.com/ytc/AIdro_kLoSU3ge6hrBUXHxVeKMiGe4bdGS1wACFV0oFgWxDMKvj-=s160-c-k-c0x00ffffff-no-rj"
const ididathingphoto = "https://yt3.googleusercontent.com/ytc/AIdro_mj5xe_kr7JYc4PDpmc3FaYasPAg5ups859rpzqeXnkuXg=s160-c-k-c0x00ffffff-no-rj"
const simonegiertz = "https://yt3.googleusercontent.com/ytc/AIdro_llfi-8d2Zve1U9FXZPXZsKNB9_65U5gHwKRwAoHLOUDg=s160-c-k-c0x00ffffff-no-rj"
const rednile = "https://yt3.googleusercontent.com/sJjv-k8rR1lggpulNcj5jLN7Cgf7_6Hzjkp0_93cy2xvEAjgcE8hXJUxx0vaKrVXYthJMKsg=s160-c-k-c0x00ffffff-no-rj"
const michaelreeves = "https://yt3.googleusercontent.com/ytc/AIdro_nA1CW3Etd_zH2e9n5Fa2SgqXm173tL0rHCXaDY0wqRYwI=s160-c-k-c0x00ffffff-no-rj"

const youtubers = [
    {name: "William Osman", photo: williamosmanphoto},
    {name: "I did a thing", photo: ididathingphoto},
    {name: "Simone Giertz", photo: simonegiertz},
    {name: "Rednile", photo: rednile},
    {name: "Michael Reeves", photo: michaelreeves}

]

const conversationContext = []

// post endpoint /chat allows for a sender name and message then responds with a message
app.get('/chat', async (_, res) => {
    // we will track the whole conversation and pick a random youtuber each response

    //build out the conversation context for the chat

    const randomYoutuber = youtubers[Math.floor(Math.random() * youtubers.length)]

    const rules = "The rules for the conversation: 'keep it short', 'no cursing', 'be a bit random', 'as time goes on become more unhinged', 'only one person should talk per response'"

    let chatMessage = "You are " + randomYoutuber.name + " create a prompt for all the other youtubers, don't mention anyone by name. " + rules

    
    if (conversationContext.length > 0) {
        const sender = conversationContext[conversationContext.length - 1].sender
        const message = conversationContext[conversationContext.length - 1].message

        //if this is only the second message I might need to garantee that the second message is from a different youtuber

        chatMessage = "You are " + randomYoutuber.name + ", you recieved a message from " + sender + " that says: " + message
            + ". Here is all of the previous conversation thus far: " + JSON.stringify(conversationContext) + ". " + rules
    }


    const chatCompletion = await client.chat.completions.create({
        messages: [{ role: 'user', content: chatMessage }],
        model: 'gpt-4o',
    });

    conversationContext.push({sender: randomYoutuber.name, message: chatCompletion.choices[0].message.content})

    res.json({ text: chatCompletion.choices[0].message.content, sender: randomYoutuber});
});

app.listen(port, () => {
});

