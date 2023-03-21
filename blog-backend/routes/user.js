const express = require('express');
const router = express.Router();
const pool = require("../config");
const bcrypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
require('dotenv').config();  // using env files
const jwtKey = process.env.jwtKey;
const { body, validationResult } = require('express-validator');

router.post("/signup",
    [
        body('email', "Enter a valid email").isEmail(),
        body('name', "Enter a name").isLength({ min: 3 }),
        body('username', "Enter a valid username").isLength({ min: 5 }),
        body('password', "Enter Valid Password").isLength({ min: 8 })
    ], async (req, resp) => {
        const errors = validationResult(req)
        if (!errors.isEmpty()) {

            return resp.status(400).json({ Result: "Criteria Not Fullfilled" });
        }
        else {

            const { email } = req.body;
            const values = [email]
            const query = 'select * from tbl_user where email = $1'
            const result = await pool.query(query, values);
            if (result.rowCount > 0) {
                resp.send({ Result: "User With Same Email Exists" })
                // resp.send(result)
            }
            else {
                try {
                    const { email, name, password, username } = req.body;
                    const salt = await bcrypt.genSalt(10);
                    const securePass = await bcrypt.hash(password, salt);
                    const values = [email, name, username, securePass];
                    const query = 'insert into tbl_user (email,name,username,password) values($1,$2,$3,$4) returning*';
                    const user = await pool.query(query, values);
                    // resp.send(user.rows[0]);
                    const auth = JWT.sign({ username }, jwtKey, { expiresIn: "2h" })
                    if (auth) {
                     const {id,username} = user.rows[0];
                        resp.status(200).send({ auth, id , username });
                    } else {
                        return false
                    }


                } catch (err) {

                    return resp.status(500).send({ Result: err.message })

                }
            }


        }

    })




router.post('/login', [
    body("email").isEmail(),
    body("password").exists()
], async (req, resp) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        resp.status(400).send({ Result: errors.array() });
    }
    try {

        const { email, password } = req.body;
        const values = [email];
        const query = 'select * from  tbl_user where email = $1'
        const result = await pool.query(query, values);
        // const data = result.rows[0];

        // const send
        if (result.rowCount > 0) {

            const compare = await bcrypt.compare(password, result.rows[0].password);
            if (compare) {
                // console.log("Login");
                // resp.send(username)
                // const username = result.rows[0].username;
                const {id,username} = result.rows[0];
                const auth = JWT.sign({ username }, jwtKey, { expiresIn: "2h" });
                if (auth) {

                    resp.send({ auth: auth, id,username })
                } else {
                    return false;
                }


            } else {
                resp.status(400).send({ Result: "Login Acess Denied" })
            }



        }
        else {

        }

    } catch (err) {
        resp.status(500).send({ Result: err.message });

    }
})

module.exports = router;
