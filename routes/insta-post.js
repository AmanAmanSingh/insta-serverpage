const express = require("express");
const router = express.Router();
const postData = require("../model/instapost-model");
const mongoose = require("mongoose");

const cors = require("cors")

mongoose.set('strictQuery', false);

router.use(cors());
router.use(express.json({ limit: '20mb', extended: true }));

// const date = new Date().toDateString().slice(4);

router.get("/instapost", (req, res) => {
    return res.send("instapost route working!!")
})

router.post("/upload", async (req, res) => {
    // console.log(req.body);
    // console.log(req.user);
    const { image, author, location, description } = req.body;
    if (!req.body) {
        return res.status(400).json({
            message: "please provide data first!!"
        })
    }
    //CREATING POST
    try {
        let Data = await postData.create({
            image,
            author,
            location,
            description,
            user: req.user
        })
        return res.status(200).json({
            status: "sucess",
            result: Data
        })
    } catch (e) {
        return res.status(400).json({
            status: "failure",
            message: err.message
        })
    }
});
router.get("/allpost", (req, res) => {
    postData.find().then((data) => {
        res.status(200).send(data)
    }).catch(err => {
        return res.status(400).json({
            status: err
        })
    })
})

router.get("/images", (req, res) => {
    postData.find().sort({ createdAt: -1 }).then((ImageData) => {
        return res.status(200).send({
            images: ImageData,
        })
    }).catch(err => {
        return res.status(400).json({
            status: err
        })
    })
})

module.exports = router;