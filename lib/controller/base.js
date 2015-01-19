var mixin = require('mixin-class');
var events = require('events');

module.exports = mixin(events, 
    function() {
        this.state = new this.State();
    },
    {
        State: null,
        listen: null,

        start: function() {
            this.refresh();
            this.listen(this.refresh.bind(this));
        },

        refresh: function() {
            this.data = this.state.get();
            Object.freeze(this.data);
            Object.freeze(this.data.query);
            this.emit('change', this.data);
        },

        onChange: function(listener) {
            this.on('change', listener);
        },

        getData: function() {
            return this.data;
        },

        setData: function(data) {
            this.state.set(data);
        },

        replaceData: function(data) {
            this.state.replace(data);
        }
    }
);