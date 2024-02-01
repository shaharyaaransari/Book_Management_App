const mongoose = require("mongoose");




const BookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true},
  genre: { type: String, require: true },
  price: { type: Number, required: true },
  image: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
  
});

const BookModels =  mongoose.model("Book",BookSchema);

module.exports = BookModels ;
