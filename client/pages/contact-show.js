/*global alert*/
var app = require('ampersand-app');
var PageView = require('./base');
var templates = require('../templates');
var ContactForm = require('../forms/contact');


module.exports = PageView.extend({
    pageTitle: 'view contact',
    template: templates.pages.contactView,
    bindings: {
        'model.name': {
            hook: 'name'
        },
        'model.editUrl': {
            type: 'attribute',
            hook: 'edit',
            name: 'href'
        }
    },
    events: {
        'click [data-hook~=delete]': 'handleDeleteClick'
    },
    initialize: function (spec) {
        var self = this;
        app.contacts.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('couldnt find a model with id: ' + spec.id);
            self.model = model;
        });
    },
    handleDeleteClick: function () {
        this.model.destroy({success: function () {
            app.navigate('contacts');
        }});
    }
});
