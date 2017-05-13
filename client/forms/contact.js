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
                name: 'name',
                value: this.model && this.model.name,
                placeholder: 'Contact Name',
                parent: this
            }),
            new ExtendedInput({
                label: 'Number',
                name: 'number',
                value: this.model && this.model.number,
                placeholder: 'Contact Number',
                parent: this
            }),
            new ExtendedInput({
                label: 'Note',
                name: 'note',
                value: this.model && this.model.note,
                placeholder: 'Note',
                parent: this
            }),
        ];
    }
});
