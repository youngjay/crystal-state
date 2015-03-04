var mixin = require('mixin-class');
var queryString = require('query-string');
var _ = require('lodash');

module.exports = mixin({
    get: function() {
        return this.parse(this.getRaw());
    },

    set: function(data) {
        this.setRaw(typeof data === 'string' ? data: this.stringify(data));
    },

    replace: function(data) {
        this.replaceRaw(this.stringify(data));
    },

    parse: function(str) {
        var parts = str.split('?');
        var query = parts[1];
        var pathWithparameters = parts[0].split(';');
        var path = pathWithparameters[0];
        var paramenters = pathWithparameters[1];

        var retQuery = {};

        // remove hash
        if (query) {
            query = query.replace(/#.*/, '');
            _.extend(retQuery, queryString.parse(query));
        }

        // remove hash
        if (paramenters) {
            paramenters = paramenters.replace(/#.*/, '');
            _.extend(retQuery, queryString.parse(paramenters));            
        }

        return {
            path: path,
            query: retQuery
        }
    },

    stringify: function(o) {
        var qs = o.query ? queryString.stringify(o.query) : null;
        var path = o.path;
        return qs ? path.indexOf('?') === -1 ? path + '?' + qs : path + '&' + qs : path
    }
});