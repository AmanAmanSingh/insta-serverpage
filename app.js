const express = require("express");
const app = express();
const instapostRouter = require("./routes/insta-post")
const cors = require("cors")
const fileUpload = require("express-fileupload")

const DB = 'mongodb+srv://aman:aman@cluster0.fwu27hk.mongodb.net/instaclone1?retryWrites=true&w=majority'
const mongoose = require("mongoose");

mongoose.connect(DB, () => {
    console.log("connected sucessfully")
}, (e) => {
    console.log(e.message)
});

app.use(express.json());
app.use(cors());
app.use(fileUpload())

mongoose.set('strictQuery', false);

app.get("/", (req, res) => {
    res.send("working fine!!!")
})

app.use("/", instapostRouter)
app.listen(8081, () => { console.log("server started at port 8081") })
