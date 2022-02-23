const mongoose = require("mongoose");
const { Schema } = mongoose;

const ReplySchema = new Schema({
    text: { type: String, required: true },
    delete_password: { type: String },
    created_on: { type: Date, required: true, default: new Date() },
    reported: { type: Boolean }
})
let Reply = mongoose.model('Reply', ReplySchema)

const ThreadSchema = new Schema({
    text: { type: String, required: true },
    delete_password: { type: String },
    board: { type: String, required: true },
    created_on: { type: Date, required: true, default: new Date() },
    bumped_on: { type: Date, default: new Date() },
    reported: { type: Boolean },
    replies: [ReplySchema]
})
let Thread = mongoose.model('Thread', ThreadSchema)

exports.Thread = Thread;
exports.Reply = Reply;