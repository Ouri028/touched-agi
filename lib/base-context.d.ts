/// <reference types="node" />
import { EventEmitter } from 'events';
import { Duplex } from 'stream';
import { Callback, IResponse, IVariables } from './interfaces';
export declare enum State {
    init = 0,
    waiting = 1
}
export declare class BaseContext extends EventEmitter {
    protected stream: Duplex;
    readonly variables: IVariables;
    protected state: State;
    protected buffer: string;
    protected pending: null | Callback;
    constructor(stream: Duplex);
    on(event: 'error', listener: (err: Error) => void): this;
    on(event: 'response', listener: (variables: IResponse) => void): this;
    on(event: 'variables', listener: (variables: IVariables) => void): this;
    on(event: 'hangup' | 'close' | 'response', listener: () => void): this;
    sendCommand(command: string): Promise<IResponse>;
    onVariables(): Promise<IVariables>;
    end(): Promise<void>;
    protected send(msg: string, callback: Callback): void;
    private read;
    private readVariables;
    private readResponse;
    private readResponseLine;
}
