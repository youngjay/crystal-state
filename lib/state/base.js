var mixin = require('mixin-class');
var queryString = require('query-string');

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

        // remove hash
        if (query) {
            query = query.replace(/#.*/, '');
        }    

        return {
            path: parts[0],
            query: query ? queryString.parse(query) : {}
        }
    },

    stringify: function(o) {
        var qs = o.query ? queryString.stringify(o.query) : null;
        var path = o.path;
        return qs ? path.indexOf('?') === -1 ? path + '?' + qs : path + '&' + qs : path
    }
});