var mixin = require('mixin-class');
var events = require('events');
var _ = require('lodash');

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
            var data = this.state.get();
            if (_.isEqual(data, this.data)) {
                return;
            }
            this.data = data;
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
            this.refresh();
        },

        replaceData: function(data) {
            this.state.replace(data);
            this.refresh();
        }
    }
);