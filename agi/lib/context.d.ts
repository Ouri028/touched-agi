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
    answer(): Promise<IResponse>;
    /**
     * Interrupts expected flow of Async AGI commands and
     * returns control to previous source (typically, the PBX dialplan).
     *
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_asyncagi+break
     */
    asyncAGIBreak(): Promise<IResponse>;
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
    channelStatus(chanelname: string): Promise<IResponse>;
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
    controlStreamFile(filename: string, escapeDigits?: phoneKeys[], skipMS?: number, ffChar?: phoneKeys, rewChar?: phoneKeys, pauseChar?: phoneKeys, offsetms?: number): Promise<IResponse>;
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
    databaseDel(family: string, key: string): Promise<IResponse>;
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
    databaseDelTree(family: string, keyTree: string): Promise<IResponse>;
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
    databaseGet(family: string, key: string): Promise<IResponse>;
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
    databasePut(family: string, key: string, value: string): Promise<IResponse>;
    /**
     * Executes application with given options.
     * Returns whatever the application returns, or -2 on failure to find application.
     */
    exec(command: string, ...options: string[]): Promise<IResponse>;
    /**
     * Prompts for DTMF on a channel
     * Stream the given file, and receive DTMF data.
     * Returns the digits received from the channel at the other end.
     * https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGICommand_get+data
     */
    getData(file: string, timeout: number, maxDigits: number): Promise<IResponse>;
    getFullVariable(name: string, channelName?: string): Promise<IResponse>;
    getOption(filename: string, escapeDigits?: phoneKeys[], timeout?: number): Promise<IResponse>;
    getVariable(name: string): Promise<IResponse>;
    goSub(context: string, extension: string, priority: string, optArg?: string): Promise<IResponse>;
    hangup(chanelname?: string): Promise<IResponse>;
    noop(): Promise<IResponse>;
    receiveChar(timeout: number): Promise<IResponse>;
    receiveText(timeout: number): Promise<IResponse>;
    recordFile(file: string, format?: string, escapeDigits?: phoneKeys[], timeout?: number, offsetSamples?: number, beep?: boolean, silence?: number): Promise<IResponse>;
    sayAlpha(data: string, escapeDigits?: phoneKeys[]): Promise<IResponse>;
    sayDate(date: Date, escapeDigits?: phoneKeys[]): Promise<IResponse>;
    sayDateTime(date: Date, escapeDigits?: phoneKeys[], format?: string, timezone?: string): Promise<IResponse>;
    sayDigits(data: number, escapeDigits?: phoneKeys[]): Promise<IResponse>;
    sayNumber(data: number, escapeDigits?: phoneKeys[], gender?: string): Promise<IResponse>;
    sayPhonetic(data: string, escapeDigits?: phoneKeys[]): Promise<IResponse>;
    sayTime(date: Date, escapeDigits?: phoneKeys[]): Promise<IResponse>;
    sendImage(name: string): Promise<IResponse>;
    sendText(text: string): Promise<IResponse>;
    setAutoHangup(time: number): Promise<IResponse>;
    setCallerID(callerrid: string): Promise<IResponse>;
    setContext(context: string): Promise<IResponse>;
    setExtension(extension: string): Promise<IResponse>;
    setMusic(mode: 'on' | 'off', className?: string): Promise<IResponse>;
    setPriority(priority: string): Promise<IResponse>;
    setVariable(name: string, value: string): Promise<IResponse>;
    streamFile(filename: string, escapeDigits?: phoneKeys[], offsetms?: number): Promise<IResponse>;
    verbose(message: string, level?: 1 | 2 | 3 | 4): Promise<IResponse>;
    waitForDigit(timeout?: number): Promise<IResponse>;
    dial(target: string, timeout: number, params: string): Promise<IResponse>;
}
