module.exports = require('./base').extend(
    {
        State: require('../state/url'),
        listen: function(listener) {
            window.addEventListener('popstate', listener);
        }
    }
);