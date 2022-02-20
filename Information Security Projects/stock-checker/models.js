const mongoose = require("mongoose");
const { Schema } = mongoose;

const StockSchema = new Schema({
    name: {type: String, required: true},
    likes: {type: Number, default: 0},
    ips: [String]
});
const Stock = mongoose.model("Stock", StockSchema);

exports.Stock = Stock;