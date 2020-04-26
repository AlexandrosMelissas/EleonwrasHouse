const functions = require('firebase-functions');
const admin = require('firebase-admin')
admin.initializeApp()
const db = admin.firestore()
const sgmail = require('@sendgrid/mail')

const API_KEY = functions.config().sendgrid.key
const TEMPLATE_ID = functions.config().sendgrid.template

sgmail.setApiKey(API_KEY)


exports.contactform = functions.firestore.document('contact/{contactId}').onCreate(async (change,context) => {

    const contactSnap = await db.collection('contact').doc(context.params.contactId).get()

    const contact = contactSnap.data()

    const msg = {
        to: "mrgatossssssssss@gmail.com",
        from: contact.email,
        templateId : TEMPLATE_ID,
        dynamic_template_data : {
            full_name : contact.full_name,
            email : contact.email,
            message: contact.message
        }
    }


    return sgmail.send(msg)

})