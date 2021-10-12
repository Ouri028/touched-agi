import { Agi } from "./src/agi.js";

const agi = new Agi();


agi.use(ctx => {
    console.log(ctx);
    if(ctx.agi_network == "yes") {
        const x = ctx.exec("Test", ["300", "s", "1"]);
        console.log(x);
    }
});

agi.listen(3000, () => console.log("Listening on port 3000..."));