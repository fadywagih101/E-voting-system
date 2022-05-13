const express = require('express')
const Vote = require('../models/vote')
const Candidate = require('../models/candidates')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendConfirmationEmail } = require('../emails/account')
const { findById } = require('../models/vote')
const router = new express.Router()

router.get('/result', auth, async (req, res) => {
    try {
        const result=await Vote.aggregate([
            {$match:{}},
            {$group:{_id:"$towhom",count: { $sum: 1 }}},
            { $sort : { count : -1} },
            { $limit : 1 }
            ])
        const user=await Candidate.findOne({_id: result[0]._id })
        res.status(201).send(user)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router