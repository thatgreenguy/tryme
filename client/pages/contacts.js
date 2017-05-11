var PageView = require('./base');
var templates = require('../templates');
var ContactView = require('../views/contact');


module.exports = PageView.extend({
    pageTitle: 'contacts',
    template: templates.pages.contacts,
    events: {
        'click [data-hook~=shuffle]': 'shuffle',
        'click [data-hook~=fetch]': 'fetchCollection',
        'click [data-hook~=reset]': 'resetCollection',
        'click [data-hook~=add]': 'addRandom'
    },
    render: function () {
        this.renderWithTemplate();
        this.renderCollection(this.collection, ContactView, this.queryByHook('contacts-list'));
        if (!this.collection.length) {
            this.fetchCollection();
        }
    },
    fetchCollection: function () {
        this.collection.fetch();
        return false;
    },
    resetCollection: function () {
        this.collection.reset();
    },
    shuffle: function () {
        this.collection.comparator = function () {
            return !Math.round(Math.random());
        };
        this.collection.sort();
        delete this.collection.comparator;
        return false;
    },
    addRandom: function () {
        function getRandom(min, max) {
            return min + Math.floor(Math.random() * (max - min + 1));
        }
        var names = 'Joe Harry Larry Sue Bob Rose Angela Tom Merle Joseph Josephine'.split(' ');
        var numbers = '01908123456 01908475475 01525112233 01714448888 0121112266'.split(' ');
        var notes = 'note1 note2 note3 note4 note5 note6 callback urgent noteymcnoteface'.split(' ');

        this.collection.create({
            name: names[getRandom(0, names.length - 1)],
            number: numbers[getRandom(0, numbers.length - 1)],
            note: notes[getRandom(0, notes.length - 1)]
        });
    }
});
