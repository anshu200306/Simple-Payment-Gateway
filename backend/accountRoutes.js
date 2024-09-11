const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const zod = require('zod');
const { account } = require('./db');
const { user } = require('./db');
const authMiddleware = require('./middleware');

router.get('/balance', authMiddleware, async (req,res) => {
    const accountFind = await account.findOne({
        userId: req.userId
    });
    res.status(200).json({
        balance: accountFind.balance
    });
});

const transferSchema = zod.object({
    to: zod.string(),
    amount: zod.number()
});

router.post('/transfer',authMiddleware , async (req,res) => {
    const body = req.body;
    const response = transferSchema.safeParse(body);
    const date = Date();

    if(!response.success){
        return res.status(403).send('Invalid inputs');
    }

    try{
        const session = await mongoose.startSession();

        session.startTransaction();

        const Account = await account.findOne({userId: req.userId}).session(session);
        if(!Account){
            await session.abortTransaction();
            session.endSession();
            return req.status(400).send('Invalid account'); 
        }

        const toAccount = await account.findOne({userId: body.to}).session(session);
        if(!toAccount){
            await session.abortTransaction();
            session.endSession();
            return req.status(400).send('Invalid account');
        }

        if(Account.balance < body.amount){
            await session.abortTransaction();
            session.endSession();
            return res.status(400).send('Insufficient balance');
        }

        await account.updateOne({userId: req.userId},{
            $inc: {
                balance: -body.amount
            }
        }).session(session);

        await account.updateOne({userId: body.to},{
            $inc: {
                balance: body.amount
            }
        }).session(session);
        
        console.log(toAccount.firstName);

        await user.updateOne({_id: req.userId},{
            $push: {
                transactionHistory: {
                    sendTo: body.to,
                    amount: body.amount,
                    date: date
                }
            }
        }).session(session);

        await session.commitTransaction();
        session.endSession();
        res.status(200).send('Transfer successful');
    }catch{
        res.status(403).send('OOPS!! an error occured');
    }
})

module.exports = router;