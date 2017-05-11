/*global alert*/
var app = require('ampersand-app');
var PageView = require('./base');
var templates = require('../templates');
var ContactForm = require('../forms/contact');


module.exports = PageView.extend({
    pageTitle: 'edit contact',
    template: templates.pages.contactEdit,
    initialize: function (spec) {
        var self = this;
        app.contacts.getOrFetch(spec.id, {all: true}, function (err, model) {
            if (err) alert('couldnt find a model with id: ' + spec.id);
            self.model = model;
        });
    },
    subviews: {
        form: {
            // this is the css selector that will be the `el` in the
            // prepareView function.
            container: 'form',
            // this says we'll wait for `this.model` to be truthy
            waitFor: 'model',
            prepareView: function (el) {
                var model = this.model;
                return new ContactForm({
                    el: el,
                    model: this.model,
                    submitCallback: function (data) {
                        model.save(data, {
                            wait: true,
                            success: function () {
                                app.navigate('/contacts');
                            }
                        });
                    }
                });
            }
        }
    }
});
