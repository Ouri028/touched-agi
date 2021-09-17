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
     
   }
}
