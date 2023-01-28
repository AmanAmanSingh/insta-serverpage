const express = require("express");
const router = express.Router();
const registerData = require("../model/reg-login-model");
const bcrypt = require("bcrypt");
const { body, validationResult } = require("express-validator");

//TESTING ROUTES
router.get("/reg", (req, res) => {
    return res.status(200).json({
        message: "register route working!!"
    })
})

//POST REGISTER ROUTE
router.post("/register",
    body("userame").isAlpha(),
    body("email").isEmail(),
    body("password").isAlphanumeric(),
    async (req, res) => {
        const { username, email, password } = req.body;
        try {
            //CHECK ALREADY EXIST 
            const isUserExist = await registerData.findOne({ email });
            if (isUserExist) {
                return res.status(400).json({
                    message: "User alredy exist, try with login"
                })
            }
            //CHECK VALID CREDENTIALS OR NOT
            const isValid = validationResult(req)
            if (isValid.isEmpty()) {
                return res.status(400).json({
                    message: "Please write valid details"
                })
            }
            //HASHING PASSWORD
            bcrypt.hash(password, 10, async (err, hashpassword) => {
                if (err) {
                    return res.status(400).json({
                        message: err.message
                    })
                }
                const data = await registerData.create({
                    username,
                    email,
                    password: hashpassword
                })
                return res.status(200).json({
                    message: "created succefully",
                    username: data.username
                })
            })

        } catch (e) {
            return res.status(400).json({
                message: "Registeration Failed"
            })
        }
    })


module.exports = router;