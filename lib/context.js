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
Object.defineProperty(exports, "__esModule", { value: true });
exports.Context = void 0;
var base_context_1 = require("./base-context");
var Context = /** @class */ (function (_super) {
    __extends(Context, _super);
    function Context() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    /**
     *  response.result = "-1" | "0"
     *
     * -1. channel failure
     *
     *  0 successful
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_answer
     */
    Context.prototype.answer = function () {
        var _this = this;
        return this.sendCommand('ANSWER').then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    /**
     * Interrupts expected flow of Async AGI commands and
     * returns control to previous source (typically, the PBX dialplan).
     *
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_asyncagi+break
     */
    Context.prototype.asyncAGIBreak = function () {
        var _this = this;
        return this.sendCommand('ASYNCAGI BREAK').then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    /**
     * response.result = "1" | "2" | "3" | "4" | "5" | "6" | "7" \
     *
     * 0  Channel is down and available.
     *
     * 1  Channel is down, but reserved.
     *
     * 2  Channel is off hook.
     *
     * 3  Digits (or equivalent) have been dialed.
     *
     * 4  Line is ringing.
     *
     * 5  Remote end is ringing.
     *
     * 6  Line is up.
     *
     * 7  Line is busy.
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_channel+status
     */
    Context.prototype.channelStatus = function (chanelname) {
        var _this = this;
        return this.sendCommand("CHANNEL STATUS " + chanelname).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    /**
     * Playback specified file with ability to be controlled by user
     *
     * filename -- filename to play (on the asterisk server)
     *  (don't use file-type extension!)
     *
     * escapeDigits -- if provided,
     *
     * skipMS -- number of milliseconds to skip on FF/REW
     *
     * ffChar -- if provided, the set of chars that fast-forward
     *
     * rewChar -- if provided, the set of chars that rewind
     *
     * pauseChar -- if provided, the set of chars that pause playback
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_control+stream+file
     */
    Context.prototype.controlStreamFile = function (filename, escapeDigits, skipMS, ffChar, rewChar, pauseChar, offsetms) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = [1, 2, 3, 4, 5, 6, 7, 8, 0]; }
        if (skipMS === void 0) { skipMS = 3000; }
        if (ffChar === void 0) { ffChar = '#'; }
        if (rewChar === void 0) { rewChar = '*'; }
        var command = "CONTROL STREAM FILE " + filename + (" \"" + escapeDigits + "\" " + skipMS + " " + ffChar + " " + rewChar);
        if (pauseChar) {
            command += " " + pauseChar;
        }
        if (offsetms) {
            command += " " + offsetms;
        }
        return this.sendCommand(command).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    /**
     * Deletes an entry in the Asterisk database for a given family and key.
     * response.result = "0" | "1"
     *
     * 0  successful
     *
     * 1  otherwise.
     *
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_database+del
     */
    Context.prototype.databaseDel = function (family, key) {
        var _this = this;
        return this.sendCommand("DATABASE DEL " + family + " " + key).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    /**
     * Deletes a family or specific keytree within a family in the Asterisk database.
     * response.result = "0" | "1"
     *
     * 0   if successful
     *
     * 1  otherwise.
     *
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_database+deltree
     */
    Context.prototype.databaseDelTree = function (family, keyTree) {
        var _this = this;
        return this.sendCommand("DATABASE DELTREE " + family + " " + keyTree).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    /**
     * Retrieves an entry in the Asterisk database for a given family and key.
     * response.result = "0" | "1"
     *
     * 0  key is not set
     *
     * 1  key is set and returns the variable in response.value
     *
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_database+get
     */
    Context.prototype.databaseGet = function (family, key) {
        var _this = this;
        return this.sendCommand("DATABASE GET " + family + " " + key).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    /**
     * Adds or updates an entry in the Asterisk database for a given family, key, and value.
     * response.result = "0" | "1"
     *
     * 0 successful
     *
     * 1  otherwise.
     *
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_database+put
     */
    Context.prototype.databasePut = function (family, key, value) {
        var _this = this;
        return this.sendCommand("DATABASE PUT " + family + " " + key + " " + value).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    /**
     * Executes application with given options.
     * Returns whatever the application returns, or -2 on failure to find application.
     */
    Context.prototype.exec = function (command) {
        var _this = this;
        var options = [];
        for (var _i = 1; _i < arguments.length; _i++) {
            options[_i - 1] = arguments[_i];
        }
        return this.sendCommand("EXEC " + command + " " + options).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    /**
     * Prompts for DTMF on a channel
     * Stream the given file, and receive DTMF data.
     * Returns the digits received from the channel at the other end.
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_get+data
     */
    Context.prototype.getData = function (file, timeout, maxDigits) {
        var _this = this;
        return this.sendCommand("GET DATA " + file + " " + timeout + " " + maxDigits).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.getFullVariable = function (name, channelName) {
        var _this = this;
        if (channelName === void 0) { channelName = ''; }
        return this.sendCommand("GET FULL VARIABLE " + name + " " + channelName).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.getOption = function (filename, escapeDigits, timeout) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = []; }
        if (timeout === void 0) { timeout = 5000; }
        return this.sendCommand("GET OPTION " + filename + " \"" + escapeDigits + "\" " + timeout).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.getVariable = function (name) {
        var _this = this;
        return this.sendCommand("GET VARIABLE " + name).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.goSub = function (context, extension, priority, optArg) {
        var _this = this;
        if (optArg === void 0) { optArg = ''; }
        return this.sendCommand("GOSUB " + context + " " + extension + " " + priority + " " + optArg).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.hangup = function (chanelname) {
        var _this = this;
        return this.sendCommand("HANGUP" + (chanelname ? " " + chanelname : '')).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.noop = function () {
        var _this = this;
        return this.sendCommand("NOOP").then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.receiveChar = function (timeout) {
        var _this = this;
        return this.sendCommand("RECEIVE CHAR " + timeout).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.receiveText = function (timeout) {
        var _this = this;
        return this.sendCommand("RECEIVE TEXT " + timeout).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.recordFile = function (file, format, escapeDigits, timeout, offsetSamples, beep, silence) {
        var _this = this;
        if (format === void 0) { format = 'wav'; }
        if (escapeDigits === void 0) { escapeDigits = []; }
        if (timeout === void 0) { timeout = -1; }
        if (offsetSamples === void 0) { offsetSamples = 0; }
        var command = "RECORD FILE \"" + file + "\" " + format + " \"" + escapeDigits + "\" " + timeout + " " + offsetSamples;
        if (beep) {
            command += ' 1';
        }
        if (silence) {
            command += " s=" + silence;
        }
        return this.sendCommand(command).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.sayAlpha = function (data, escapeDigits) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = []; }
        return this.sendCommand("SAY ALPHA " + data + " \"" + escapeDigits + "\"").then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.sayDate = function (date, escapeDigits) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = []; }
        return this.sendCommand("SAY DATE " + (date.getTime() / 1000).toFixed() + " \"" + escapeDigits + "\"").then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.sayDateTime = function (date, escapeDigits, format, timezone) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = []; }
        var command = "SAY DATETIME " + (date.getTime() / 1000).toFixed() + " \"" + escapeDigits + "\"";
        if (format) {
            command += " " + format;
        }
        if (timezone) {
            command += " " + timezone;
        }
        return this.sendCommand(command).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.sayDigits = function (data, escapeDigits) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = []; }
        return this.sendCommand("SAY DIGITS " + data + " \"" + escapeDigits + "\"").then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.sayNumber = function (data, escapeDigits, gender) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = []; }
        var command = "SAY NUMBER " + data + " \"" + escapeDigits + "\"";
        if (gender) {
            command += " " + gender;
        }
        return this.sendCommand(command).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.sayPhonetic = function (data, escapeDigits) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = []; }
        return this.sendCommand("SAY PHONETIC \"" + data + "\" \"" + escapeDigits + "\"").then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.sayTime = function (date, escapeDigits) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = []; }
        return this.sendCommand("SAY TIME " + (date.getTime() / 1000).toFixed() + " \"" + escapeDigits + "\"").then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.sendImage = function (name) {
        var _this = this;
        return this.sendCommand("SEND IMAGE " + name).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.sendText = function (text) {
        var _this = this;
        return this.sendCommand("SEND TEXT \"" + text + "\"").then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.setAutoHangup = function (time) {
        var _this = this;
        return this.sendCommand("SET AUTOHANGUP " + time).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.setCallerID = function (callerrid) {
        var _this = this;
        return this.sendCommand("SET CALLERID " + callerrid).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.setContext = function (context) {
        var _this = this;
        return this.sendCommand("SET CONTEXT " + context).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.setExtension = function (extension) {
        var _this = this;
        return this.sendCommand("SET EXTENSION " + extension).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.setMusic = function (mode, className) {
        var _this = this;
        if (className === void 0) { className = 'default'; }
        return this.sendCommand("SET MUSIC " + mode + " " + className).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.setPriority = function (priority) {
        var _this = this;
        return this.sendCommand("SET PRIORITY " + priority).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.setVariable = function (name, value) {
        var _this = this;
        return this.sendCommand("SET VARIABLE " + name + " \"" + value + "\"").then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.streamFile = function (filename, escapeDigits, offsetms) {
        var _this = this;
        if (escapeDigits === void 0) { escapeDigits = []; }
        var command = "STREAM FILE \"" + filename + "\" \"" + escapeDigits + "\"";
        if (offsetms) {
            command += " " + offsetms;
        }
        return this.sendCommand(command).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.verbose = function (message, level) {
        var _this = this;
        var command = "VERBOSE \"" + message + "\"";
        if (level) {
            command += " " + level;
        }
        return this.sendCommand(command).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.waitForDigit = function (timeout) {
        var _this = this;
        if (timeout === void 0) { timeout = 10000; }
        return this.sendCommand("WAIT FOR DIGIT " + timeout).then(function (x) {
            return JSON.stringify({ result: x.result, value: x.value });
        }).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    Context.prototype.dial = function (target, timeout, params) {
        var _this = this;
        return this.exec('Dial', target + "," + timeout, params).catch(function (e) {
            _this.end();
            return "An Error Occurred: " + e;
        });
    };
    return Context;
}(base_context_1.BaseContext));
exports.Context = Context;
