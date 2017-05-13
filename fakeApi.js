var _ = require('lodash');


var people = [
    {
        id: 1,
        firstName: 'Henrik',
        lastName: 'Joreteg',
        coolnessFactor: 11
    },
    {
        id: 2,
        firstName: 'Bob',
        lastName: 'Saget',
        coolnessFactor: 2
    },
    {
        id: 3,
        firstName: 'Larry',
        lastName: 'King',
        coolnessFactor: 4
    },
    {
        id: 4,
        firstName: 'Diana',
        lastName: 'Ross',
        coolnessFactor: 6
    },
    {
        id: 5,
        firstName: 'Crazy',
        lastName: 'Dave',
        coolnessFactor: 8
    },
    {
        id: 6,
        firstName: 'Larry',
        lastName: 'Johannson',
        coolnessFactor: 4
    }
];

var contacts = [
    {
        id: 1,
        name: 'Jack Jones',
        number: '01908 112233',
        note: 'trade in astra for new kia coming in next week'
    },
    {
        id: 2,
        name: 'Tiny Temper',
        number: '01201 112233',
        note: 'Renwe same vehicle for another 18 months PCP'
    },
    {
        id: 3,
        name: 'Stan Stone',
        number: '01525 112233',
        note: 'Interested in new Santa Fe but only wants black one'
    }
];

// Handle People

var id = 7;

function get(id) {
    return _.findWhere(people, {id: parseInt(id + '', 10)});
}

exports.list = function (req, res) {
    res.send(people);
};

exports.add = function (req, res) {
    var person = req.body;
    person.id = id++;
    people.push(person);
    res.status(201).send(person);
};

exports.get = function (req, res) {
    var found = get(req.params.id);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.delete = function (req, res) {
    var found = get(req.params.id);
    if (found) people = _.without(people, found);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.update = function (req, res) {
    var found = get(req.params.id);
    if (found) _.extend(found, req.body);
    res.status(found ? 200 : 404);
    res.send(found);
};

// Handle Contacts
var contactId = 4;

function contactget(id) {
    return _.findWhere(contacts, {id: parseInt(id + '', 10)});
}

exports.contactlist = function (req, res) {
    res.send(contacts);
};

exports.contactadd = function (req, res) {
    var contact = req.body;
    contact.id = contactId++;
    contacts.push(contact);
    res.status(201).send(contact);
};

exports.contactget = function (req, res) {
    var found = contactget(req.params.id);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.contactdelete = function (req, res) {

    var found = contactget(req.params.id);
    if (found) contacts = _.without(contacts, found);
    res.status(found ? 200 : 404);
    res.send(found);
};

exports.contactupdate = function (req, res) {
    var found = contactget(req.params.id);
    if (found) _.extend(found, req.body);
    res.status(found ? 200 : 404);
    res.send(found);
};
