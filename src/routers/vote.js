const express = require('express')
const Vote = require('../models/vote')
const auth = require('../middleware/auth')
const { sendWelcomeEmail, sendConfirmationEmail } = require('../emails/account')
const router = new express.Router()

router.post('/votes', auth, async (req, res) => {
    const vote = new Vote({
        ...req.body,
        owner: req.user._id
    })
    try {
        const votebefore = await Vote.findOne({owner: req.user._id })
        if (votebefore) {
            throw new Error()
        }
    } catch (error) {
        res.status(400).send('you are already voted')
        return
    }

    try {
        await vote.save()
        res.status(201).send(vote)
    } catch (e) {
        res.status(400).send(e)
    }
})

module.exports = router