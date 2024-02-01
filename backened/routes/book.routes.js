const express =  require("express");

const bookRouter = express.Router()

const bookController = require("../controlller/bookController");
const { auth, roleMiddleware } = require("../middleware/auth");

bookRouter.get("/",auth,bookController.GetBook)
bookRouter.post("/",auth,roleMiddleware("CREATOR"),bookController.AddBook)
bookRouter.put("/:id",auth,roleMiddleware("CREATOR"),bookController.UpdateBook)
bookRouter.delete("/:id",auth,roleMiddleware("CREATOR"),bookController.DeleteBook)
bookRouter.get("/old", auth, bookController.oldBooksController);
bookRouter.get("/new", auth, bookController.newBooksController);
module.exports = bookRouter