module.exports = require('./base').extend({    
    State: require('../state/hash'),
    listen: function(listener) {
        window.addEventListener('hashchange', listener);
    }
});
