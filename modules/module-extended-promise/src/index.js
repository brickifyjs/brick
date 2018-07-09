'use strict';

var Stack = function () {
};

Stack.prototype = {

    /***
     *
     * Creates a promise
     *
     * @param options
     * @param fn
     */
    stack: function (fn) {
        this.promise = new Promise(fn);

        return this;
    },
    then: function (onSuccess, onError) {

        var me = this;

        if (onSuccess && !onError) {
            me.promise = me.promise.then(onSuccess);
        } else if (onSuccess && onError) {
            me.promise = me.promise.then(onSuccess, onError);
        }
        else {
            me.promise = me.promise.catch(onError);
        }

        return this;
    },
    /***
     *
     * Catch promise method
     *
     * @param error
     * @returns {me}
     */
    catch: function (error) {
        this.then(null, error);

        return this;
    },
    /***
     *
     * Success sugar for resolved promise
     *
     * @param success
     * @returns {me}
     */
    success: function (success) {
        this.then(success, null);
        return this;
    },
    /***
     *
     * Error sugar for rejected promise
     *
     * @param error
     * @returns {me}
     */
    error: function (error) {
        this.then(null, error);

        return this;
    },
    reset: function () {
        this.promise = null;
        return this;
    },
    wait: function (time) {

        var me = this;

        this.then(function (r) { // then

            return me
                .stack( // then p
                    function (resolve) {
                        setTimeout(function () {
                            resolve(r);
                        }, time);
                    }
                )
        });

        return this;
    }
};


Stack.stackify = function (destObject) {

    destObject = destObject || this;

    var props = Object.keys(Stack.prototype);

    for (var i = 0, len = props.length; i < len; i++) {
        destObject[props[i]] = Stack.prototype[props[i]];
    }

    return destObject;
};

module.exports = Stack;