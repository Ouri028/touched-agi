const { EventEmitter } = require("events");
const { Duplex } = require("stream");
const { debug } = require("debug");
// Enum for state management
const State = Object.freeze({
  "init": 1,
  "waiting": 2
});

const send = (data) => `---> ${data}`;
const received = (data) => `<--- ${data}`;
const error = (data) => `!!!!! ${data}`;

class BaseContext extends EventEmitter {
  constructor(stream) {
    super();
    this.stream.on("data", data => {
      this.read(data.toString());
    });
    this.stream.on("error", (...args) => this.emit("error", ...args));
    this.stream.on("close", (...args) => this.emit("close", ...args));
    this.IVariables = {};
    this.state = State.init;
    this.buffer = "";
    this.pending = null;
  }

  // Event listener
  on(event, listener) {
    debug(`emitted: ${event}`);
    return super.on(event, listener);
  }

  sendCommand(command) {
    debug(send(command));
    return new Promise((resolve, reject) => {
      this.send(`${command}\n`, (err, result) => {
        if (err || result.result.includes("-1") || result.value.includes("-1")) {
          debug(error(err.message));
          // this.end();
          reject(err);
        } else {
          debug(received(JSON.stringify(result)));
          resolve(result);
        }
      });
    });
  }

  onVariables() {
    return new Promise(resolve => {
      this.on("variables", data => {
        resolve(data);
      });
    });
  }

  end() {
    return new Promise(resolve => {
      this.stream.end(() => {
        resolve();
      });
    });
  }

  send(msg, callback) {
    this.pending = callback;
    this.stream.write(msg);
  }

  read(data) {
    this.buffer += data;
    switch(this.state) {
      case State.init:
        if(!this.buffer.includes("\n\n")) {
          return;
        } else {
          this.readVariables(this.buffer);
        }
        break;
      case State.waiting:
        if(!this.buffer.includes("\n")) {
          return;
        } else {
          this.readResponse(this.buffer);
        }
    }
    this.buffer = "";

  }

  readVariables(data) {
    debug(received(data));
    const dataArr = data.split("\n").slice(0, -2);
    dataArr.forEach(el => {
      const [name, value = ""] =el.split(":");
      this.variables[name.splice(4)] = value.trim();
    });
    this.state = State.waiting;
    this.emit("variables", this.variables);
  }

  readRequest(data) {
    const lines = data.split("\n");
    lines.forEarch(line => {
      this.readResponseLine(line);
    });
  }

  readResponseLine(line) {
    if(line === "") {
      return;
    }
    const parsed = /^(\d{3})(?: result=)([^(]*)(?:\((.*)\))?/.exec(line);
    if(parsed === null) {
      this.emit("hangup");
      return;
    }
    const [, code, result, value] = parsed;
    const response = {
      code: parseInt(code, 10),
      result: result.trim();
    };
    if(value) {
      response.value = value;
    }
    if(this.pending !== null) {
      const pending = this.pending;
      this.pending = null;
      pending(null, response);
    }
    this.emit("response", response);
  }
}

module.exports = {
  BaseContext
}
