const mongoose = require("mongoose")

const blackListSchema = mongoose.Schema({
    token:{type:String}
})


const BlackListModel = mongoose.model("blacklist",blackListSchema)

module.exports = BlackListModel