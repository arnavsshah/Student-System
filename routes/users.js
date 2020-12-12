const express = require("express");
const router = express.Router();
const driver = require('../config/db');
const bcrypt = require('bcryptjs');
const passport = require('passport');
const {
    check,
    validationResult
} = require('express-validator');
// const bcrypt = require('bcryptjs');
// const passport = require('passport');
const path = require('path');
let validationChecks = [
    check('first_name', 'First name is required').notEmpty(),
    check('last_name', 'Last name is required').notEmpty(),
    check('email', 'Email address is required').notEmpty(),
    check('email', 'Please enter a valid email address').normalizeEmail().isEmail(),
    check('college_id', 'College Id is required').notEmpty(),
    check('password', 'Please enter a password').notEmpty(),
    check('password', 'Minimum  length of password should be 8 characters').isLength({
        min: 4
    }),
    // check('password2', 'Passwords don\'t match').matches('password'),
    check('password_check').custom((value, { req, loc, path }) => {
        if (value !== req.body.password)
            throw new Error('Passwords don\'t match');
        else
            return value;

    })
];
//register route
router.post("/register", validationChecks, async (req, res) => {

    let errors = validationResult(req);
    console.log(req.body);
    const {
        first_name,
        last_name,
        email,
        college_id,
        password,
        password_check
    } = req.body;
    if (!errors.isEmpty()) {
        res.send({ errors: errors.array() })
    } else {

        console.log("start....");
        const session = driver.session();
        var result2 = await session.run(
            `Match(s:Student{email: $email}) return s`, { email: email }
        )
        if (result2.records.length > 0) {
            errors['msg'] = 'Sorry, this email id already register!';
            await session.close()
            res.send({
                errors: errors.array()
            });
        }
        else {
            bcrypt.genSalt(10, async (err, salt) => {
                bcrypt.hash(password, salt, async (err, hash) => {
                    if (err) throw err;

                        try {
                            const result = await session.run(
                                `CREATE (s:Student {name: $first_name + " " + $last_name, 
                                                email : $email, 
                                                college_id: $college_id, 
                                                password: $hash})`, {
                                                    first_name,
                                                    last_name,
                                                    email,
                                                    college_id, 
                                                    hash
                                                }
                            );
                        } finally {
                            console.log("user successfully added");
                            await session.close()
                            res.send('success');
                        }
                    }
            )});
        }
        // await driver.close();
    }
});

//login route
router.post('/login', (req, res, next) => {

    passport.authenticate("local", (err, user, next) => {
        if (err) throw err;
        if (!user) res.send("No User Exists");
        else {
          req.logIn(user, (err) => {
            if (err) throw err;
            // console.log("user", req.user);
            res.send("Successfully Authenticated");
            
          });
        // console.log(req);
        // console.log('h', user);
        // res.send("Successfully Authenticated");
        }
      })(req, res, next);
});

module.exports = router;