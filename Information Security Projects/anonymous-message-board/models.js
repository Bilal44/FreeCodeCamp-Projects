const mongoose = require("mongoose");
const { Schema } = mongoose;

let date = new Date();
const ReplySchema = new Schema({
    text: { type: String, required: true },
    delete_password: { type: String },
    created_on: { type: Date, default: date },
    reported: { type: Boolean, default: false }
})
let Reply = mongoose.model('Reply', ReplySchema)

const ThreadSchema = new Schema({
    text: { type: String, required: true },
    delete_password: { type: String },
    board: { type: String, required: true },
    created_on: { type: Date, required: true, default: date },
    bumped_on: { type: Date, default: date },
    reported: { type: Boolean, default: false },
    replies: [ReplySchema]
})
let Thread = mongoose.model('Thread', ThreadSchema)

exports.Thread = Thread;
exports.Reply = Reply;