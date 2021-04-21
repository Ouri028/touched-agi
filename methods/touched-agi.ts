import { Agi } from "../agi/lib/agi";

class touched {

    agi = new Agi();

    GetData = async (ctx: any, file: string, waitTime: number, maxDigits: number) => {
        var x = await ctx.getData(file, waitTime, maxDigits);
        if (x.result === "-1") {
            console.error("Asterisk Channel is unavailable. \n Ending the call.");
            return ctx.hangup().then(async () => await ctx.end());
        }
        return {
            code: 200,
            message: x.result
        };
    }

    StreamFile = async (ctx: any, file: string) => {
        var x = await ctx.streamFile(file);
        if (x.result.includes("-1")) {
            console.error("Asterisk Channel is unavailable. \n Ending the call.");
            return ctx.hangup().then(async () => await ctx.end());
        }
        return {
            code: 200,
            message: "success"
        };
    }

    SayDigits = async (ctx: any, digits: string) => {
        var x = await ctx.sayDigits(digits);
        if (x.result.includes("-1")) {
            console.error("Asterisk Channel is unavailable. \n Ending the call.");
            return ctx.hangup().then(async () => await ctx.end());
        }
        return {
            code: 200,
            message: "success"
        };
    }

    Exec = async (ctx: any, command: string, ...options: string[]) => {
        var x = await ctx.exec(command, ...options);
        if (x.result.includes("-1")) {
            console.error("Asterisk Channel is unavailable. \n Ending the call.");
            return ctx.hangup().then(async () => await ctx.end());
        }
        return {
            code: 200,
            message: "success"
        };
    }

    GetVariable = async (ctx: any, name: string) => {
        var x = await ctx.getVariable(name);
        if (x.result.includes("-1")) {
            console.error("Asterisk Channel is unavailable. \n Ending the call.");
            return ctx.hangup().then(async () => await ctx.end());
        }
        return {
            code: 200,
            message: x.value
        };
    }

    SetVariable = async (ctx: any, name: string, value: string) => {
        var x = await ctx.setVariable(name, value);
        if (x.result.includes("-1")) {
            console.error("Asterisk Channel is unavailable. \n Ending the call.");
            return ctx.hangup().then(async () => await ctx.end());
        }
        return {
            code: 200,
            message: "success"
        };
    }

}

export default touched;