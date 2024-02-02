const mongoose = require('mongoose')

const UserChannelSchema = new mongoose.Schema({
    channel_id: {
        type: String,
        required: true
    },
    user_id: {
        type: String,
        required: true
    },
})

const UserChannelModel = mongoose.model("userchannels", UserChannelSchema)
module.exports = UserChannelModel;