const express = require("express");
const router = express.Router();
const logindata = require("../model/reg-login-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const secret = "viratkohli";
const cors = require("cors")
router.use(cors());

//TESTING ROUTE WORKING !!
router.get("/log", (req, res) => {
    return res.status(200).json({
        message: "Login route Working!!"
    })
});

router.post("/login", async (req, res) => {
    const { email, password } = req.body;
    // console.log(req.body)
    try {
        //USER REGISTERED ?
        const userData = await logindata.findOne({ email });
        // console.log(userData)
        if (!userData) {
            return res.status(400).json({
                message: "User not exist, Please Signup first"
            })
        }
        //DECODING PASSWORD
        bcrypt.compare(password, userData.password, async (err, result) => {
            if (err) {
                return res.status(400).json({
                    message: err.message
                })
            }
            //GEN.JWT TOKEN
            if (result) {
                const token = jwt.sign({
                    exp: Math.floor((Date.now() / 1000) + (60 * 60)),
                    data: userData._id,
                }, process.env.SECRET_KEY);
                return res.status(200).json({
                    message: "login sucessfully",
                    user: userData.username,
                    token
                })
            } else {
                return res.status(400).json({
                    message: "incorrect password"
                })
            }
        })
    } catch (e) {
        res.status(400).json({
            message: e.message
        })
    }
})



module.exports = router;