const sgMail = require('@sendgrid/mail')

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

const sendWelcomeEmail = async(email, name) => {
    sgMail.send({
        to: email,
        from: 'nasermahmoud425@gmail.com',
        subject: 'Thanks for joining in!',
        text: `Welcome to the app, ${name}. Let me know how you get along with the app.`
    })
}

const sendConfirmationEmail = async(email, name) => {
    sgMail.send({
        to: email,
        from: 'andrew@mead.io',
        subject: 'Thanks for your vote',
        text: `your vote go to ${name}. Thanks for joining.`
    })
}

module.exports = {
    sendWelcomeEmail,
    sendConfirmationEmail
}