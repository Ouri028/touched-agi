export declare type Middleware<T> = (context: T, next: () => Promise<any>) => any;
export declare type ComposedMiddleware<T> = (context: T, next?: () => Promise<any>) => Promise<void>;
export declare function compose<T>(middlewares: Array<Middleware<T>>): ComposedMiddleware<T>;
