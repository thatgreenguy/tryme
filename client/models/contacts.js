var Collection = require('ampersand-rest-collection');
var Contact = require('./contact');


module.exports = Collection.extend({
    model: Contact,
    url: '/api/contacts'
});
