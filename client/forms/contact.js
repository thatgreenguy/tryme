var FormView = require('ampersand-form-view');
var InputView = require('ampersand-input-view');
var templates = require('../templates');
var ExtendedInput = InputView.extend({
    template: templates.includes.formInput()
});

module.exports = FormView.extend({
    fields: function () {
        return [
            new ExtendedInput({
                label: 'Name',
                name: 'contactName',
                value: this.model && this.model.contactName,
                placeholder: 'Contact Name',
                parent: this
            }),
            new ExtendedInput({
                label: 'Number',
                name: 'contactNumber',
                value: this.model && this.model.contactNumber,
                placeholder: 'Contact Number',
                parent: this
            }),
            new ExtendedInput({
                label: 'Note',
                name: 'contactNote',
                value: this.model && this.model.contactNote,
                placeholder: 'Note',
                parent: this
            }),
        ];
    }
});
