import { Duplex } from 'stream';
import { BaseContext } from './base-context';
import { IResponse, phoneKeys } from './interfaces';

export class Context extends BaseContext {
  /**
   *  response.result = "-1" | "0"
   *
   * -1. channel failure
   *
   *  0 successful
   * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_answer
   */
  public answer(): Promise<IResponse> | Promise<string> {
    return this.sendCommand('ANSWER').then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

  /**
   * Interrupts expected flow of Async AGI commands and
   * returns control to previous source (typically, the PBX dialplan).
   *
   * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_asyncagi+break
   */
  public asyncAGIBreak(): Promise<IResponse> | Promise<string> {
    return this.sendCommand('ASYNCAGI BREAK').then(x => {
      return JSON.stringify({ result: x.result, value: x.value })
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

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
  public channelStatus(chanelname: string): Promise<IResponse> | Promise<string> {
    return this.sendCommand(`CHANNEL STATUS ${chanelname}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

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
  public controlStreamFile(
    filename: string,
    escapeDigits: phoneKeys[] = [1, 2, 3, 4, 5, 6, 7, 8, 0],
    skipMS: number = 3000,
    ffChar: phoneKeys = '#',
    rewChar: phoneKeys = '*',
    pauseChar?: phoneKeys,
    offsetms?: number,
  ): Promise<IResponse> | Promise<string> {
    let command = `CONTROL STREAM FILE ${filename}` + ` "${escapeDigits}" ${skipMS} ${ffChar} ${rewChar}`;
    if (pauseChar) {
      command += ` ${pauseChar}`;
    }
    if (offsetms) {
      command += ` ${offsetms}`;
    }
    return this.sendCommand(command).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

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
  public databaseDel(family: string, key: string) {
    return this.sendCommand(`DATABASE DEL ${family} ${key}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

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
  public databaseDelTree(family: string, keyTree: string) {
    return this.sendCommand(`DATABASE DELTREE ${family} ${keyTree}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

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
  public databaseGet(family: string, key: string) {
    return this.sendCommand(`DATABASE GET ${family} ${key}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

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
  public databasePut(family: string, key: string, value: string) {
    return this.sendCommand(`DATABASE PUT ${family} ${key} ${value}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

  /**
   * Executes application with given options.
   * Returns whatever the application returns, or -2 on failure to find application.
   */
  public exec(command: string, ...options: string[]) {
    return this.sendCommand(`EXEC ${command} ${options}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  /**
   * Prompts for DTMF on a channel
   * Stream the given file, and receive DTMF data.
   * Returns the digits received from the channel at the other end.
   * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_get+data
   */
  public getData(file: string, timeout: number, maxDigits: number) {
    return this.sendCommand(`GET DATA ${file} ${timeout} ${maxDigits}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public getFullVariable(name: string, channelName: string = '') {
    return this.sendCommand(`GET FULL VARIABLE ${name} ${channelName}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public getOption(filename: string, escapeDigits: phoneKeys[] = [], timeout: number = 5000) {
    return this.sendCommand(`GET OPTION ${filename} "${escapeDigits}" ${timeout}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public getVariable(name: string) {
    return this.sendCommand(`GET VARIABLE ${name}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public goSub(context: string, extension: string, priority: string, optArg: string = '') {
    return this.sendCommand(`GOSUB ${context} ${extension} ${priority} ${optArg}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public hangup(chanelname?: string) {
    return this.sendCommand(`HANGUP${chanelname ? ` ${chanelname}` : ''}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public noop() {
    return this.sendCommand(`NOOP`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public receiveChar(timeout: number) {
    return this.sendCommand(`RECEIVE CHAR ${timeout}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public receiveText(timeout: number) {
    return this.sendCommand(`RECEIVE TEXT ${timeout}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public recordFile(
    file: string,
    format: string = 'wav',
    escapeDigits: phoneKeys[] = [],
    timeout: number = -1,
    offsetSamples: number = 0,
    beep?: boolean,
    silence?: number,
  ) {
    let command = `RECORD FILE "${file}" ${format} "${escapeDigits}" ${timeout} ${offsetSamples}`;
    if (beep) {
      command += ' 1';
    }
    if (silence) {
      command += ` s=${silence}`;
    }

    return this.sendCommand(command).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public sayAlpha(data: string, escapeDigits: phoneKeys[] = []) {
    return this.sendCommand(`SAY ALPHA ${data} "${escapeDigits}"`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public sayDate(date: Date, escapeDigits: phoneKeys[] = []) {
    return this.sendCommand(`SAY DATE ${(date.getTime() / 1000).toFixed()} "${escapeDigits}"`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public sayDateTime(date: Date, escapeDigits: phoneKeys[] = [], format?: string, timezone?: string) {
    let command = `SAY DATETIME ${(date.getTime() / 1000).toFixed()} "${escapeDigits}"`;
    if (format) {
      command += ` ${format}`;
    }
    if (timezone) {
      command += ` ${timezone}`;
    }
    return this.sendCommand(command).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public sayDigits(data: number, escapeDigits: phoneKeys[] = []) {
    return this.sendCommand(`SAY DIGITS ${data} "${escapeDigits}"`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public sayNumber(data: number, escapeDigits: phoneKeys[] = [], gender?: string) {
    let command = `SAY NUMBER ${data} "${escapeDigits}"`;
    if (gender) {
      command += ` ${gender}`;
    }
    return this.sendCommand(command).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public sayPhonetic(data: string, escapeDigits: phoneKeys[] = []) {
    return this.sendCommand(`SAY PHONETIC "${data}" "${escapeDigits}"`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public sayTime(date: Date, escapeDigits: phoneKeys[] = []) {
    return this.sendCommand(`SAY TIME ${(date.getTime() / 1000).toFixed()} "${escapeDigits}"`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public sendImage(name: string) {
    return this.sendCommand(`SEND IMAGE ${name}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public sendText(text: string) {
    return this.sendCommand(`SEND TEXT "${text}"`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

  public setAutoHangup(time: number) {
    return this.sendCommand(`SET AUTOHANGUP ${time}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public setCallerID(callerrid: string) {
    return this.sendCommand(`SET CALLERID ${callerrid}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public setContext(context: string) {
    return this.sendCommand(`SET CONTEXT ${context}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public setExtension(extension: string) {
    return this.sendCommand(`SET EXTENSION ${extension}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public setMusic(mode: 'on' | 'off', className: string = 'default') {
    return this.sendCommand(`SET MUSIC ${mode} ${className}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public setPriority(priority: string) {
    return this.sendCommand(`SET PRIORITY ${priority}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public setVariable(name: string, value: string) {
    return this.sendCommand(`SET VARIABLE ${name} "${value}"`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
  public streamFile(filename: string, escapeDigits: phoneKeys[] = [], offsetms?: number) {
    let command = `STREAM FILE "${filename}" "${escapeDigits}"`;
    if (offsetms) {
      command += ` ${offsetms}`;
    }
    return this.sendCommand(command).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

  public verbose(message: string, level?: 1 | 2 | 3 | 4) {
    let command = `VERBOSE "${message}"`;
    if (level) {
      command += ` ${level}`;
    }
    return this.sendCommand(command).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

  public waitForDigit(timeout: number = 10000) {
    return this.sendCommand(`WAIT FOR DIGIT ${timeout}`).then(x => {
      return JSON.stringify({ result: x.result, value: x.value });
    }).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }

  public dial(target: string, timeout: number, params: string) {
    return this.exec('Dial', `${target},${timeout}`, params).catch(e => {
      this.end();
      return `An Error Occurred: ${e}`;
    });
  }
}
