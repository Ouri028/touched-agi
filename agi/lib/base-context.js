"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var events_1 = require("events");
var debug = debug_1.debug('context');
var State;
(function (State) {
    State[State["init"] = 0] = "init";
    State[State["waiting"] = 1] = "waiting";
})(State = exports.State || (exports.State = {}));
var send = function (data) { return "---> " + data; };
var received = function (data) { return "<--- " + data; };
var error = function (data) { return "!!!!! " + data; };
var BaseContext = /** @class */ (function (_super) {
    __extends(BaseContext, _super);
    function BaseContext(stream) {
        var _this = _super.call(this) || this;
        _this.stream = stream;
        _this.variables = {};
        _this.state = State.init;
        _this.buffer = '';
        _this.pending = null;
        _this.stream.on('data', function (data) {
            _this.read(data.toString());
        });
        _this.stream.on('error', function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            return _this.emit.apply(_this, __spreadArrays(['error'], arg));
        });
        _this.stream.on('close', function () {
            var arg = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                arg[_i] = arguments[_i];
            }
            return _this.emit.apply(_this, __spreadArrays(['close'], arg));
        });
        return _this;
    }
    BaseContext.prototype.on = function (event, listener) {
        debug("emitted: " + event);
        return _super.prototype.on.call(this, event, listener);
    };
    BaseContext.prototype.sendCommand = function (command) {
        var _this = this;
        debug(send(command));
        return new Promise(function (resolve, reject) {
            _this.send(command + "\n", function (err, result) {
                if (err) {
                    debug(error(err.message));
                    reject(err);
                }
                else {
                    debug(received(JSON.stringify(result)));
                    resolve(result);
                }
            });
        });
    };
    BaseContext.prototype.onVariables = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.on('variables', function (data) {
                resolve(data);
            });
        });
    };
    BaseContext.prototype.end = function () {
        var _this = this;
        return new Promise(function (resolve) {
            _this.stream.end(function () {
                resolve();
            });
        });
    };
    BaseContext.prototype.send = function (msg, callback) {
        this.pending = callback;
        this.stream.write(msg);
    };
    BaseContext.prototype.read = function (data) {
        this.buffer += data;
        switch (this.state) {
            case State.init:
                if (!this.buffer.includes('\n\n')) {
                    return;
                }
                else {
                    this.readVariables(this.buffer);
                }
                break;
            case State.waiting:
                if (!this.buffer.includes('\n')) {
                    return;
                }
                else {
                    this.readResponse(this.buffer);
                }
        }
        this.buffer = '';
    };
    BaseContext.prototype.readVariables = function (data) {
        var _this = this;
        debug(received(data));
        var dataArr = data.split('\n').slice(0, -2);
        dataArr.forEach(function (el) {
            var _a = el.split(':'), name = _a[0], _b = _a[1], value = _b === void 0 ? '' : _b;
            _this.variables[name.slice(4)] = value.trim();
        });
        this.state = State.waiting;
        this.emit('variables', this.variables);
    };
    BaseContext.prototype.readResponse = function (data) {
        var _this = this;
        var lines = data.split('\n');
        lines.forEach(function (line) {
            _this.readResponseLine(line);
        });
    };
    BaseContext.prototype.readResponseLine = function (line) {
        if (line === '') {
            return;
        }
        var parsed = /^(\d{3})(?: result=)([^(]*)(?:\((.*)\))?/.exec(line);
        if (parsed === null) {
            this.emit('hangup');
            return;
        }
        var code = parsed[1], result = parsed[2], value = parsed[3];
        var response = {
            code: parseInt(code, 10),
            result: result.trim(),
        };
        if (value) {
            response.value = value;
        }
        if (this.pending !== null) {
            var pending_1 = this.pending;
            this.pending = null;
            pending_1(null, response);
        }
        this.emit('response', response);
    };
    return BaseContext;
}(events_1.EventEmitter));
exports.BaseContext = BaseContext;
