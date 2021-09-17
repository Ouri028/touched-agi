const { Duplex } = require("stream");
const { BaseContext } = require("./base-context");


class Context extends BaseContext {
  /**
   *  response.result = "-1" | "0"
   *
   * -1. channel failure
   *
   *  0 successful
   * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_answer
   */

   answer() {
     return this.sendCommand("ANSWER");
   }

  /**
   * Interrupts expected flow of Async AGI commands and
   * returns control to previous source (typically, the PBX dialplan).
   *
   * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_asyncagi+break
   */

   asyncAGIBreak() {
     return this.sendCommand("ASYNCAGI BREAK");
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

   channelStatus(channelName) {
     return this.sendCommand(`CHANNEL STATUS ${channelName}`);
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

   controlStreamFile(filename, escapeDigits = [1, 2, 4, 5, 6, 7, 8, 9, 0], skipMS = 3000, ffChar = "#", rewChar = "*", pauseChar, offsetms) {
    let command = `CONTROL STREAM FILE ${filename}` + ` "${escapeDigits}" ${skipMS} ${ffChar} ${rewChar}`;
    if (pauseChar) {
      command += ` ${pauseChar}`;
    }
    if (offsetms) {
      command += ` ${offsetms}`;
    }
    return this.sendCommand(command).
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

   databaseDel(family, key) {
     return this.sendCommand(`DATABASE DEL ${family} ${key}`);
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

   databaseDelTree(family, keyTree) {
     return this.sendCommand(`DATABASE DELTREE ${family} ${keyTree}`);
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

   databaseGet(family, key) {
     return this.sendCommand(`DATABASE GET ${family} ${key}`);
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

   databasePut(family, key, value) {
     return this.sendCommand(`DATABASE PUT ${family} ${key} ${value}`);
   }

  /**
   * Executes application with given options.
   * Returns whatever the application returns, or -2 on failure to find application.
   */

   exec(command, ...options) {
     return this.sendCommand(`EXEC ${command} ${options}`);
   }

  /**
   * Prompts for DTMF on a channel
   * Stream the given file, and receive DTMF data.
   * Returns the digits received from the channel at the other end.
   * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_get+data
   */

   getData(file, timeout, maxDigits) {
     return this.sendCommand(`GET DATA ${file} ${timeout} ${maxDigits}`);
   }

   getFullVariable(name, channelName) {
     return this.sendCommand(`GET FULL VARIABLE ${name} ${channelName}`);
   }
}
