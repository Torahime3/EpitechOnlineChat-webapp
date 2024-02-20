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
        default: Date.now,
    },
    is_private: {
        type: Boolean,
        required: true,
        default: false,
    },
});

ChannelSchema.index({ channel_name: 1 }, { unique: true })

const ChannelModel = mongoose.model("channels", ChannelSchema)
module.exports = ChannelModel;