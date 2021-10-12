import { createServer, Socket } from "net";
import { Compose } from "./compose.js";
import { Context } from "./context.js";

class Agi {
    constructor() {
        this.middlewares = [];
        this.silent = false;
    }

    use(fn) {
        if(typeof fn !== "function") {
            throw new TypeError("Middleware must be a function!");
        }
        this.middlewares.push(fn);
        return this;
    }

    listen(...args) {
        const server = createServer(this.callback());
        return server.listen(...args);
    }

    callback() {
        const functions = new Compose()._Compose(this.middlewares);
        const handle = (socket) => {
            const ctx = new Context(socket);
            this.handle(ctx, functions);
        };
        return handle;
    }

    handle(ctx, fnMiddleware) {
        ctx
        .onVariables()
        .then(async () => await fnMiddleware(ctx))
        .then(async () => await ctx.end())
        .catch(async err => {
            this.onError(err);
            await ctx.end();
        });
    }

    onError(err) {
        if(this.silent) {
            return;
        }
        const msg = err.stack || err.toString();
        global.console.error();
        global.console.error(msg.replace(/^/gm, ""));
        global.console.error();
    }
}

export {
    Agi
}