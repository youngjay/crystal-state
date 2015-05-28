var mixin = require('mixin-class');
var events = require('events');
var _ = require('lodash');

module.exports = mixin(events, 
    function() {
        this.state = new this.State();
    },
    {
        State: null,
        listen: function() {
            throw new Error('to be implement');
        },

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
            var self = this;
            return function() {
                self.unChange(listener);
            }
        },

        unChange: function(listener) {
            this.removeListener('change', listener);
        },

        setTimeout: function(fn, timeout) {
            return this.autoDisposeTimer(fn, timeout, setTimeout, clearTimeout);
        },

        setInterval: function(fn, timeout) {
            return this.autoDisposeTimer(fn, timeout, setInterval, clearInterval);
        },

        autoDisposeTimer: function(fn, timeout, setter, clearer) {
            var handle = setter(fn, timeout);
            var currentPath = this.getData().path;
            var dispose = this.onChange(function(data) {
                // compare path avoid onStateChange after set
                if (data.path !== currentPath) {
                    dispose();
                    clearer(handle);
                }
            });
            return handle;
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