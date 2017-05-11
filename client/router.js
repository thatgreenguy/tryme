var app = require('ampersand-app');
var Router = require('ampersand-router');
var HomePage = require('./pages/home');
var CollectionDemo = require('./pages/collection-demo');
var Contacts = require('./pages/contacts');
var InfoPage = require('./pages/info');
var PersonAddPage = require('./pages/person-add');
var PersonEditPage = require('./pages/person-edit');
var PersonShowPage = require('./pages/person-show');
var ContactAddPage = require('./pages/contact-add');
var ContactEditPage = require('./pages/contact-edit');
var ContactShowPage = require('./pages/contact-show');

module.exports = Router.extend({
    routes: {
        '': 'home',
        'collections': 'collectionDemo',
        'contacts': 'contacts',
        'info': 'info',
        'person/add': 'personAdd',
        'person/:id': 'personView',
        'person/:id/edit': 'personEdit',
        'contact/add': 'contactAdd',
        'contact/:id': 'contactView',
        'contact/:id/edit': 'contactEdit',
        '(*path)': 'catchAll'
    },

    // ------- ROUTE HANDLERS ---------
    home: function () {
        app.trigger('page', new HomePage({
            model: app.me
        }));
    },

    collectionDemo: function () {
        app.trigger('page', new CollectionDemo({
            model: app.me,
            collection: app.people
        }));
    },

    contacts: function () {
        app.trigger('page', new Contacts({
            model: app.me,
            collection: app.contacts
        }));
    },

    info: function () {
        app.trigger('page', new InfoPage({
            model: app.me
        }));
    },

    personAdd: function () {
        app.trigger('page', new PersonAddPage());
    },

    personEdit: function (id) {
        app.trigger('page', new PersonEditPage({
            id: id
        }));
    },

    personView: function (id) {
        app.trigger('page', new PersonShowPage({
            id: id
        }));
    },

    contactAdd: function () {
        app.trigger('page', new ContactAddPage());
    },

    contactEdit: function (id) {
        app.trigger('page', new ContactEditPage({
            id: id
        }));
    },

    contactView: function (id) {
        app.trigger('page', new ContactShowPage({
            id: id
        }));
    },

    catchAll: function () {
        this.redirectTo('');
    }
});
