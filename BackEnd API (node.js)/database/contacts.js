"use strict";

const knex = require('./knex');
const sqlite3 = require('sqlite3').verbose();
let db;

function createDb() {
    console.log("createDb contacts!");
    db = new sqlite3.Database('contacts.sqlite3', createTable);
}

function createTable() {
    console.log("createTable contacts");

    db.run("CREATE TABLE IF NOT EXISTS contacts (id INTEGER PRIMARY KEY NOT NULL UNIQUE, first_name TEXT NOT NULL, last_name TEXT NOT NULL, phone_number TEXT NOT NULL UNIQUE, email TEXT UNIQUE, age INTEGER, picture TEXT, website TEXT, tags TEXT)", (err) => {
        if(err) {
            return console.log('error:', err.message)
        }
        console.log('Table created')
    });

    db.close();
}

createDb();

function createContact(contact) {
    return knex('contacts').insert(contact);
}

function getAllContacts() {
    return knex('contacts').select('*');
}

function getContactDetails(id) {
    return knex('contacts').select('*').where('id', id);
}

function updateContact(id, contact) {
    return knex('contacts').where('id', id).update(contact);
}

function deleteContact(id) {
    return knex('contacts').where('id', id).del();
}

module.exports = {
    createContact,
    getAllContacts,
    getContactDetails,
    updateContact,
    deleteContact
}