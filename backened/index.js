const express = require("express");
const app = express();
 const mongoose = require('mongoose')
 const cors = require("cors");
const userRouter = require("./routes/user.routes");
const bookRouter = require("./routes/book.routes");
app.use(express.json());
require("dotenv").config()


app.use(cors())

app.use("/user",userRouter)
app.use("/books",bookRouter)

app.get("/", (req, res) => {
        res.send("welcome to Home Page.")
})

const connections = async () => {
        try {
                await mongoose.connect(process.env.MONGO_URL)
                console.log("connected!..")
        } catch (error) {
                console.log(error)
        }
}

app.listen(8080, () => {
        connections()
        console.log("server runnig..")
})


