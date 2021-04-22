    const GetData = async (ctx: any, file: string, waitTime: number, maxDigits: number) => {
        try{
            var x = await ctx.getData(file, waitTime, maxDigits);
            if (x.result === "-1") {
                console.error("Asterisk Channel is unavailable. \n Ending the call.");
                return ctx.hangup().then(async () => await ctx.end());
            }
            return {
                code: 200,
                message: x.result
            };
        }catch (e) {
            console.error(e);
            return ctx.hangup().then(async () => await ctx.end());
        }
    }

    const StreamFile = async (ctx: any, file: string) => {
        try{
            var x = await ctx.streamFile(file);
            if (x.result.includes("-1")) {
                console.error("Asterisk Channel is unavailable. \n Ending the call.");
                return ctx.hangup().then(async () => await ctx.end());
            }
            return {
                code: 200,
                message: "success"
            };
        }catch (e){
            console.error(e);
            return ctx.hangup().then(async () => await ctx.end());
        }
    }

    const SayDigits = async (ctx: any, digits: string) => {
        try{
            var x = await ctx.sayDigits(digits);
            if (x.result.includes("-1")) {
                console.error("Asterisk Channel is unavailable. \n Ending the call.");
                return ctx.hangup().then(async () => await ctx.end());
            }
            return {
                code: 200,
                message: "success"
            };
        }catch (e){
            console.error(e);
            return ctx.hangup().then(async () => await ctx.end());
        }
    }

    const Exec = async (ctx: any, command: string, ...options: string[]) => {
        try{
            var x = await ctx.exec(command, ...options);
            if (x.result.includes("-1")) {
                console.error("Asterisk Channel is unavailable. \n Ending the call.");
                return ctx.hangup().then(async () => await ctx.end());
            }
            return {
                code: 200,
                message: "success"
            };
        }catch (e){
            console.error(e);
            return ctx.hangup().then(async () => await ctx.end());
        }
    }

    const GetVariable = async (ctx: any, name: string) => {
        try{
            var x = await ctx.getVariable(name);
            if (x.result.includes("-1")) {
                console.error("Asterisk Channel is unavailable. \n Ending the call.");
                return ctx.hangup().then(async () => await ctx.end());
            }
            return {
                code: 200,
                message: x.value
            };
        }catch (e){
            console.error(e);
            return ctx.hangup().then(async () => await ctx.end());
        }
    }

    const SetVariable = async (ctx: any, name: string, value: string) => {
        try{
            var x = await ctx.setVariable(name, value);
            if (x.result.includes("-1")) {
                console.error("Asterisk Channel is unavailable. \n Ending the call.");
                return ctx.hangup().then(async () => await ctx.end());
            }
            return {
                code: 200,
                message: "success"
            };
        }catch (e){
            console.error(e);
            return ctx.hangup().then(async () => await ctx.end());
        }
    }

export { 
    GetData,
    StreamFile,
    SayDigits,
    Exec,
    SetVariable,
    GetVariable
};