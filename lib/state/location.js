module.exports = require('./base').extend({
    getRaw: function() {
        return location.pathname + location.search;
    },

    setRaw: function(url) {
        console.log(url)
        history.pushState({}, document.title, url);
    },

    replaceRaw: function() {
        history.replaceState({}, document.title, url);
    }
});