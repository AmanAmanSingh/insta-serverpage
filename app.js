const express = require("express");
const app = express();
const cors = require("cors");
const fileUpload = require("express-fileupload");
const jwt = require("jsonwebtoken");
// const secret = "viratkohli";
const dotenv = require("dotenv").config();
const mongoose = require("mongoose");
// ROUTES
const instapostRouter = require("./routes/insta-post")
const registerRouter = require("./routes/register")
const loginRouter = require("./routes/login")


//MONGOOSE CONNECTION
mongoose.connect(process.env.DATABASE_URI, () => {
    console.log("connected sucessfully")
}, (e) => {
    console.log(e.message)
});
mongoose.set('strictQuery', false);

//Other MIDDELWARES
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
app.use(cors());
app.use(fileUpload())


//GET REQUEST FOR TESTING
app.get("/", (req, res) => {
    res.send("working fine!!!")
})

const unProtectedRout = ["/login", "/register"];

app.use(async (req, res, next) => {
    // console.log(req.url)
    //UNPROTECTED ROUTES
    if (req.url == "/login" || req.url == "/register") {
        next();
    } else {
        //FOR PROTECTED ROUTES
        const token = req.headers.authorization;
        await jwt.verify(token, process.env.SECRET_KEY, async (err, decoded) => {
            if (err) {
                return res.status(400).json({
                    message: "session expired"
                })
            }
            req.user = decoded.data;
            next()
        })
    }
})








app.use("/", instapostRouter);
app.use("/", registerRouter);
app.use("/", loginRouter);
app.listen(8081, () => { console.log("server started at port 8081") })