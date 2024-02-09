const mongoose = require('mongoose')

const ChannelSchema = new mongoose.Schema({
    channel_name: {
        type: String,
        required: true
    },
    channel_description: {
        type: String,
        required: true
    },
    channel_creation_date: {
        type: Date,
        required: true,
        default: Date.now
    },
})

ChannelSchema.index({ channel_name: 1 }, { unique: true })

const ChannelModel = mongoose.model("channels", ChannelSchema)
module.exports = ChannelModel;