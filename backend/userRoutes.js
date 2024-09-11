const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const zod = require('zod');
const {user} = require('./db');
const jwt = require('jsonwebtoken');
const jwtSecret = require('./jwtSecret');
const authMiddleware = require('./middleware');
const {account} = require('./db');

const schema = zod.object({
    firstName: zod.string(),
    lastName: zod.string(),
    username: zod.string(),
    password: zod.string(),
});

router.post('/signUp', async (req,res) => {
    const firstName = req.body.firstName;
    const lastName = req.body.lastName;
    const username = req.body.username;
    const password = req.body.password;

    const response = schema.safeParse({
        firstName: firstName,
        lastName: lastName,
        username: username,
        password: password,
    })

    if(response.success){
        const finder = await user.findOne({username: username});
        if(finder){
            res.status(409).send('Username exists');
        }else{
            const session = await mongoose.startSession();

            session.startTransaction();
            const dbUser = await user.create({
                firstName: firstName,
                lastName: lastName,
                username: username,
                password: password,
            });
            await account.create({
                userId: dbUser._id,
                balance: 1 + Math.random() * 10000
            });
            const token = jwt.sign({user:  dbUser._id}, jwtSecret, { noTimestamp: true });
            await session.commitTransaction();
            res.status(200).json({
                msg: "User created",
                token
            });
        }
    }else{
        res.status(403).send('Invalid inputs');
    }
});

const loginSchema = zod.object({
    username: zod.string(),
    password: zod.string()
});

router.post('/signIn', async (req,res) => {
    const body = req.body;
    const check = loginSchema.safeParse(body);

    if(!check.success){
        return res.status(403).send('Invalid inputs');
    }

    const finder = await user.findOne({username: body.username});
    if(finder){
        if(finder.password == body.password){
            const token = jwt.sign({user: finder._id},jwtSecret, { noTimestamp: true });
            return res.status(200).json({
                msg: 'Login successful',
                token
            });
        }else{
            return res.status(400).send('Incorrect password');
        }
    }
    res.status(404).send('User not found');
})

const updateSchema = zod.object({
    password: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional()
});

router.put('/update', authMiddleware, async (req,res) => {
    const checker = updateSchema.safeParse(req.body);
    if(!checker.success){
        return res.status(403).send("Error while updating information");
    }
    await user.updateOne({
        _id: req.userId
    },req.body)
    res.status(200).send('Updated successfully');
})

router.get('/bulk', authMiddleware, async (req,res) => {
    const filter = req.query.filter || "";
    
    const users = await user.find({
        $or:[
            {
                firstName: {
                    "$regex": filter
                }
            },
            {
                lastName: {
                    "$regex": filter
                }
            }
        ]
    })
    const finder = await user.findOne({_id: req.userId});
    const firstName = finder.firstName;
    const lastName = finder.lastName;

    res.json({
        firstName: firstName,
        lastName: lastName,
        user: users.map((user) => ({
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            _id: user._id
        }))
    })
})

router.get('/transactionHistory', authMiddleware, async (req,res) => {
    const finder = await user.findOne({_id: req.userId});
    const history = finder.transactionHistory;

    res.status(200).json({
        firstName: finder.firstName,
        history
    })
})

module.exports = router;