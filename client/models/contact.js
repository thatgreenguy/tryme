var AmpersandModel = require('ampersand-model');


module.exports = AmpersandModel.extend({
    props: {
        id: 'any',
        contactName: ['string', true, ''],
        contactNumber: ['string', true, ''],
        contactNote: ['string', true, '']
    },
    session: {
        selected: ['boolean', true, false]
    },
    derived: {
        title: {
            deps: ['contactName'],
            fn: function () {
                return this.name + ' ' + ' title';
            }
        },
        forename: {
            deps: ['contactName'],
            fn: function () {
                return this.name + ' ' + ' surname';
            }
        },
        middlename: {
            deps: ['contactName'],
            fn: function () {
                return this.name + ' ' + ' forename';
            }
        },
        surname: {
            deps: ['contactName'],
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
