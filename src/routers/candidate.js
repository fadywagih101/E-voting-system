const express = require('express')
const multer = require('multer')
const sharp = require('sharp')
const Candidate = require('../models/candidates')
const auth = require('../middleware/auth')
const { sendWelcomeEmail } = require('../emails/account')
const router = new express.Router()

router.post('/candidates', async (req, res) => {
    console.log('here')
    const user = new Candidate(req.body)
    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({ user, token })
    } catch (e) {
        res.status(400).send(e)
    }
})
router.post('/candidates/login', async (req, res) => {
    try {
        const user = await Candidate.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        res.send({ user, token })
    } catch (e) {
        res.status(400).send()
    }
})

router.post('/candidates/logout', auth, async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter((token) => {
            return token.token !== req.token
        })
        await req.user.save()

        res.send()
    } catch (e) {
        res.status(500).send()
    }
})

module.exports = router