"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var debug_1 = require("debug");
var net_1 = require("net");
var compose_1 = require("./compose");
var context_1 = require("./context");
exports.Context = context_1.Context;
var debug = debug_1.debug('app');
var Agi = /** @class */ (function () {
    function Agi() {
        this.middlewares = [];
        this.silent = false;
    }
    Agi.prototype.use = function (fn) {
        if (typeof fn !== 'function') {
            throw new TypeError('middleware must be a function!');
        }
        debug('use %s', fn.name || '-');
        this.middlewares.push(fn);
        return this;
    };
    Agi.prototype.listen = function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        debug.apply(void 0, __spreadArrays(['listen'], args));
        var server = net_1.createServer(this.callback());
        return server.listen.apply(server, args);
    };
    Agi.prototype.callback = function () {
        var _this = this;
        var functions = compose_1.compose(this.middlewares);
        var handle = function (socket) {
            var ctx = new context_1.Context(socket);
            _this.handle(ctx, functions);
        };
        return handle;
    };
    Agi.prototype.handle = function (ctx, fnMiddelware) {
        var _this = this;
        ctx
            .onVariables()
            .then(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, fnMiddelware(ctx)];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); })
            .then(function () { return __awaiter(_this, void 0, void 0, function () { return __generator(this, function (_a) {
            switch (_a.label) {
                case 0: return [4 /*yield*/, ctx.end()];
                case 1: return [2 /*return*/, _a.sent()];
            }
        }); }); })
            .catch(function (err) { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.onError(err);
                        return [4 /*yield*/, ctx.end()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        }); });
    };
    Agi.prototype.onError = function (err) {
        if (this.silent) {
            return;
        }
        var msg = err.stack || err.toString();
        global.console.error();
        global.console.error(msg.replace(/^/gm, '  '));
        global.console.error();
    };
    return Agi;
}());
exports.Agi = Agi;
