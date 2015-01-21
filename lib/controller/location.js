module.exports = require('./base').extend(
    {
        State: require('../state/location'),
        listen: function(listener) {
            window.addEventListener('popstate', listener);
        }
    }
);