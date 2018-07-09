"use strict";
exports.__esModule = true;
var PENDING = "pending";
var FULFILLED = "fulfilled";
var REJECTED = "rejected";
var mPromise = /** @class */ (function () {
    function mPromise(resolver) {
        this.status = PENDING;
        this.onFulfilledCallbacks = [];
        this.onRejectedCallbacks = [];
        var that = this;
        try {
            resolver(resolve, reject);
        }
        catch (error) {
            reject(error);
        }
        function resolve(value) {
            that.value = value;
            that.status = FULFILLED;
            that.onFulfilledCallbacks.forEach(function (func) { return func(that.value); });
        }
        function reject(error) {
            that.error = error;
            that.status = REJECTED;
            that.onRejectedCallbacks.forEach(function (func) { return func(that.error); });
        }
    }
    mPromise.prototype.then = function (onFulfilled, onRejected) {
        var that = this;
        var brigePromise;
        if (that.status === FULFILLED) {
            brigePromise = new mPromise(function (resolve, reject) {
                setTimeout(function () {
                    try {
                        var x = onFulfilled;
                        resolvePromise(brigePromise, x, resolve, reject);
                    }
                    catch (error) {
                        reject(error);
                    }
                }, 0);
            });
        }
        else {
            brigePromise = new mPromise(function (resolve, reject) {
            });
        }
        return brigePromise;
    };
    return mPromise;
}());
function resolvePromise(brigePromise, x, resolve, reject) {
    if (x instanceof mPromise) {
        if (x.status === PENDING) {
            // 这里稍微有点绕 是担心x本身返回还是一个promise 所以要递归处理一次
            x.then(function (y) {
                resolvePromise(brigePromise, y, resolve, reject);
            }, function (e) { return reject(e); });
        }
        else {
            x.then(resolve, reject);
        }
    }
    else {
        resolve(x);
    }
}
exports["default"] = mPromise;
//# sourceMappingURL=promise.js.map