module.exports = require('./base').extend({
    getRaw: function() {
        return location.hash.replace(/^#/, '');        
    },

    setRaw: function(url) {
        location.hash = '#' + url;
    },

    replaceRaw: function(url) {
        location.replace(location.href.replace(/#.*/, '') + '#' + url);        
    }
})