const mongoose = require('mongoose')
const validator = require('validator')

const voteSchema = new mongoose.Schema({
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    towhom:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'Candidate'
    },
}, {
    timestamps: true
})

const Vote =  mongoose.model('Vote', voteSchema)

module.exports = Vote