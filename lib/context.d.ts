import { BaseContext } from './base-context';
import { IResponse, phoneKeys } from './interfaces';
export declare class Context extends BaseContext {
    /**
     *  response.result = "-1" | "0"
     *
     * -1. channel failure
     *
     *  0 successful
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_answer
     */
    answer(): Promise<IResponse> | Promise<string>;
    /**
     * Interrupts expected flow of Async AGI commands and
     * returns control to previous source (typically, the PBX dialplan).
     *
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_asyncagi+break
     */
    asyncAGIBreak(): Promise<IResponse> | Promise<string>;
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
    channelStatus(chanelname: string): Promise<IResponse> | Promise<string>;
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
    controlStreamFile(filename: string, escapeDigits?: phoneKeys[], skipMS?: number, ffChar?: phoneKeys, rewChar?: phoneKeys, pauseChar?: phoneKeys, offsetms?: number): Promise<IResponse> | Promise<string>;
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
    databaseDel(family: string, key: string): Promise<string>;
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
    databaseDelTree(family: string, keyTree: string): Promise<string>;
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
    databaseGet(family: string, key: string): Promise<string>;
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
    databasePut(family: string, key: string, value: string): Promise<string>;
    /**
     * Executes application with given options.
     * Returns whatever the application returns, or -2 on failure to find application.
     */
    exec(command: string, ...options: string[]): Promise<string>;
    /**
     * Prompts for DTMF on a channel
     * Stream the given file, and receive DTMF data.
     * Returns the digits received from the channel at the other end.
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_get+data
     */
    getData(file: string, timeout: number, maxDigits: number): Promise<string>;
    getFullVariable(name: string, channelName?: string): Promise<string>;
    getOption(filename: string, escapeDigits?: phoneKeys[], timeout?: number): Promise<string>;
    getVariable(name: string): Promise<string>;
    goSub(context: string, extension: string, priority: string, optArg?: string): Promise<string>;
    hangup(chanelname?: string): Promise<string>;
    noop(): Promise<string>;
    receiveChar(timeout: number): Promise<string>;
    receiveText(timeout: number): Promise<string>;
    recordFile(file: string, format?: string, escapeDigits?: phoneKeys[], timeout?: number, offsetSamples?: number, beep?: boolean, silence?: number): Promise<string>;
    sayAlpha(data: string, escapeDigits?: phoneKeys[]): Promise<string>;
    sayDate(date: Date, escapeDigits?: phoneKeys[]): Promise<string>;
    sayDateTime(date: Date, escapeDigits?: phoneKeys[], format?: string, timezone?: string): Promise<string>;
    sayDigits(data: number, escapeDigits?: phoneKeys[]): Promise<string>;
    sayNumber(data: number, escapeDigits?: phoneKeys[], gender?: string): Promise<string>;
    sayPhonetic(data: string, escapeDigits?: phoneKeys[]): Promise<string>;
    sayTime(date: Date, escapeDigits?: phoneKeys[]): Promise<string>;
    sendImage(name: string): Promise<string>;
    sendText(text: string): Promise<string>;
    setAutoHangup(time: number): Promise<string>;
    setCallerID(callerrid: string): Promise<string>;
    setContext(context: string): Promise<string>;
    setExtension(extension: string): Promise<string>;
    setMusic(mode: 'on' | 'off', className?: string): Promise<string>;
    setPriority(priority: string): Promise<string>;
    setVariable(name: string, value: string): Promise<string>;
    streamFile(filename: string, escapeDigits?: phoneKeys[], offsetms?: number): Promise<string>;
    verbose(message: string, level?: 1 | 2 | 3 | 4): Promise<string>;
    waitForDigit(timeout?: number): Promise<string>;
    dial(target: string, timeout: number, params: string): Promise<string>;
}
