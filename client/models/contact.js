var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        name: ['string', true, ''],
        number: ['string', true, ''],
        note: ['string', true, '']
    },
    session: {
        selected: ['boolean', true, false]
    },
    derived: {
        title: {
            deps: ['name'],
            fn: function () {
                return this.name + ' ' + ' title';
            }
        },
        forename: {
            deps: ['name'],
            fn: function () {
                return this.name + ' ' + ' surname';
            }
        },
        middlename: {
            deps: ['name'],
            fn: function () {
                return this.name + ' ' + ' forename';
            }
        },
        surname: {
            deps: ['name'],
            fn: function () {
                return this.name + ' ' + ' surname';
            }
        },
        editUrl: {
            deps: ['id'],
            fn: function () {
                return '/contact/' + this.id + '/edit';
            }
        },
        viewUrl: {
            deps: ['id'],
            fn: function () {
                return '/contact/' + this.id;
            }
        }
    }
});
