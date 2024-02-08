const mongoose = require('mongoose')
require('dotenv').config()
mongoose.connect(process.env.DB_URL).then(() => console.log("Connection to database succeed")).catch(err => console.log(err))
const ChannelsModel = require('./models/channels');
const UserChannelModel = require('./models/user_channels');
const MessageModel = require('./models/messages');

const characters = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const charactersLength = characters.length;

const randomString = (length) => {
    let result = '';
    for (let i = 0; i < length; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

async function createChannels(number){
    for (let i = 0; i < number; i++) {
        const newChannel = await new ChannelsModel({
            channel_name: randomString(10),
            channel_description: randomString(15)
        })
        newChannel.save()
    }
}

//         //Create message for the channel
//         for (let i = 0; i < 250; i++) {
//             const message = await new MessageModel({
//                 sender_id: "65b8cf5cf66c411d8b1bc15f",
//                 message_content: randomString(50),
//                 channel_id: newChannel._id,
//                 system_chat: false
//             })
//             message.save()
//         }

//         console.log ("Channel created #", i + 1);
//     }
// }

async function fillMessage(channelId, messageNumber){
    for (let i = 0; i < messageNumber; i++) {
        const message = await new MessageModel({
            sender_id: "65b8cf5cf66c411d8b1bc15f",
            message_content: randomString(50),
            channel_id: channelId,
            system_chat: false
        })
        message.save()
        console.log ("Message created #", i + 1);
    }
}


// createChannels(10)
// fillMessage("65c256729bbc9bf66082b8f6", 10000)
createChannels(10)

