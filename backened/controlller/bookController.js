const BookModels = require("../models/bookModel")


const GetBook = async (req, res) => {
    try {
        let query = {};
        if (req.query.genre) {
            query.genre = req.query.genre;
        }

        let sortCriteria = {};

     
        if (req.query.sort == 'price') {
           
            sortCriteria.price = req.query.order === '0' ? -1 : 1; 
        }

        const books = await BookModels.find(query).sort(sortCriteria);

        if (books.length === 0) {
            return res.status(404).send({ "msg": "Books not found" });
        }
        
        res.status(200).send(books);
    } catch (error) {
        res.status(400).send({ "err": error.message });
    }
};


  const AddBook =async (req, res) => {
    try {
        
        const book = new BookModels(req.body)
        await book.save()
        res.status(200).send({ "msg": "Book added", "addedBook": book })
    } catch (error) {
        res.status(400).send({ "err": error.message })
    }
}

  const UpdateBook =async(req,res)=>{
     const {id} = req.params;
     try {
        const user  =  await BookModels.findByIdAndUpdate({_id:id},req.body)
           res.status(200).send( {"msg":"Book has been updated"})
     } catch (error) {
        res.status(400).send({"err":error.message})
     }
}

 const DeleteBook =async(req,res)=>{
    const {id} = req.params;
     try {
        const user  =  await BookModels.findByIdAndDelete({_id:id})
           res.status(200).send(  {"msg":"Book has been deleted"})
     } catch (error) {
        res.status(400).send({"err":error.message})
     }
 }
 const oldBooksController = async (req, res) => {
    try {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); // Calculate 10 minutes ago
        const oldBooks = await BookModels.find({ createdAt: { $lte: tenMinutesAgo } });

        res.status(200).send(oldBooks);
    } catch (error) {
        res.status(400).send({ "err": error.message });
    }
};

// Controller for fetching books created within the last 10 minutes
const newBooksController = async (req, res) => {
    try {
        const tenMinutesAgo = new Date(Date.now() - 10 * 60 * 1000); // Calculate 10 minutes ago
        const newBooks = await BookModels.find({ createdAt: { $gte: tenMinutesAgo } });

        res.status(200).send(newBooks);
    } catch (error) {
        res.status(400).send({ "err": error.message });
    }
};
module.exports ={
      GetBook,
      AddBook, 
      UpdateBook,
      DeleteBook,
      oldBooksController,
      newBooksController

};