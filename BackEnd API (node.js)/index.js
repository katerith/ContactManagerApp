
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const db = require('./database/contacts');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/contacts', async (req, res) => {
    try {
        const [contactIndex] = await db.createContact(req.body);
        res.status(201).json({ id: contactIndex })
        console.log(`Contact No.${contactIndex} was successfully created`)
        console.log('................................................')
    } catch(err) {
        console.log('err', err.message)
    }
})

app.get('/contacts', async (req, res) => {
    try {
        const contacts = await db.getAllContacts();
        res.status(200).json({ contacts })
        console.log('Your contacts are:',)
        contacts.map(contact => console.log(JSON.stringify(contact)))
        console.log('................................................')
    } catch(err) {
        console.log('err', err.message)
    } 
})

app.get('/contacts/:id', async (req, res) => {
    try {
        const [contact] = await db.getContactDetails(req.params.id);
        res.status(200).json({ contact })
        console.log(`The Contact No.${req.params.id} is ${JSON.stringify(contact)}`)
        console.log('................................................')
    } catch(err) {
        console.log('err', err.message)
    }   
})

app.patch('/contacts/:id', async (req, res) => {
    try {
        const updatedContact = await db.updateContact(req.params.id, req.body);
        res.status(200).json({ updatedContact })
        console.log(`The Contact No.${req.params.id} was updated to ${JSON.stringify(req.body)}`)
        console.log('................................................')
    } catch(err) {
        console.log('err', err.message)
    }
})

app.delete('/contacts/:id', async (req, res) => {
    try {
        await db.deleteContact(req.params.id);
        res.status(200).json({ success: true });
        console.log(`The Contact No.${req.params.id} was succesfuly deleted`)
        console.log('................................................')
    } catch(err) {
        console.log('err', err.message)
    }    
})

app.listen(1337, () => {
    console.log("server is listening on port: 1337");
});