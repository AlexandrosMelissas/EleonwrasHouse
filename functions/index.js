const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
const nodemailer = require('nodemailer')

// const API_KEY = functions.config().sendgrid.key
// const TEMPLATE_ID = functions.config().sendgrid.template

// sgmail.setApiKey(API_KEY)


exports.contactform = functions.firestore.document('contact/{contactId}').onCreate(async (change, context) => {

    const contactSnap = await db.collection('contact').doc(context.params.contactId).get()

    const contact = contactSnap.data()
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: functions.config().contact.email,
            pass: functions.config().contact.password
        },
    });

    const mailOptions = {
        from: functions.config().contact.email,
        to: 'eleonwrashouse@gmail.com',
        subject: 'New message from Eleonwras house',
        text: `
        Full Name: ${contact.full_name} \n
        Email: ${contact.email} \n
        Message: ${contact.message} \n
        Date: ${contact.message_date}
        `
    };

    console.log('hello')
    transporter.sendMail(mailOptions).catch(e => { console.log(e) })

})