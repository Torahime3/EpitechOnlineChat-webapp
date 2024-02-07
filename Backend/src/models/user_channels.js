const mongoose = require('mongoose')

const UserChannelSchema = new mongoose.Schema({
    channel_id: {
        type: String,
        ref: 'channels',
        required: true
    },
    user_id: {
        type: String,
        ref: 'users',
        required: true
    },
})

const UserChannelModel = mongoose.model("userchannels", UserChannelSchema)
module.exports = UserChannelModel;