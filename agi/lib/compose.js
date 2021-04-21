"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function compose(middlewares) {
    if (!Array.isArray(middlewares)) {
        throw new TypeError('Middleware stack must be an array!');
    }
    for (var _i = 0, middlewares_1 = middlewares; _i < middlewares_1.length; _i++) {
        var fn = middlewares_1[_i];
        if (typeof fn !== 'function') {
            throw new TypeError('Middleware must be composed of functions!');
        }
    }
    return function (context, next) {
        var index = -1;
        function dispatch(i) {
            if (i <= index) {
                return Promise.reject(new Error('next() called multiple times'));
            }
            index = i;
            var fn = middlewares[i];
            if (i === middlewares.length) {
                fn = next;
            }
            if (!fn) {
                return Promise.resolve();
            }
            try {
                return Promise.resolve(fn(context, dispatch.bind(null, i + 1)));
            }
            catch (err) {
                return Promise.reject(err);
            }
        }
        return dispatch(0);
    };
}
exports.compose = compose;
