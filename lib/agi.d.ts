/// <reference types="node" />
import { Context } from './context';
import { Callback, ChanelStatus, IResponse, IVariables, phoneKeys } from './interfaces';
export { IResponse, IVariables, ChanelStatus, Callback, phoneKeys, Context };
export declare type Middleware<T> = (context: T, next: () => Promise<any>) => any;
export declare type ComposedMiddleware<T> = (context: T, next?: () => Promise<any>) => Promise<void>;
export declare class Agi {
    private middlewares;
    private silent;
    use(fn: Middleware<Context>): this;
    listen(...args: any): import("net").Server;
    private callback;
    private handle;
    private onError;
}
