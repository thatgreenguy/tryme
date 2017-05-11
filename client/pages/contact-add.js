var app = require('ampersand-app');
var PageView = require('./base');
var templates = require('../templates');
var ContactForm = require('../forms/contact');


module.exports = PageView.extend({
    pageTitle: 'add contact',
    template: templates.pages.contactAdd,
    subviews: {
        form: {
            container: 'form',
            prepareView: function (el) {
                return new ContactForm({
                    el: el,
                    submitCallback: function (data) {
                        app.contacts.create(data, {
                            wait: true,
                            success: function () {
                                app.navigate('/contacts');
                                app.contacts.fetch();
                            }
                        });
                    }
                });
            }
        }
    }
});
