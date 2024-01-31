const mongoose = require("mongoose");




const BookSchema = mongoose.Schema({
  title: { type: String, required: true },
  author: { type: String, required: true},
  price: { type: String, required: true },
  image: { type: String, required: true },

  
});

const BookModels =  mongoose.model("Book",BookSchema);

module.exports = BookModels ;
