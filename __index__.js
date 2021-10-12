import { Agi } from "./src/agi.js";

const agi = new Agi();


agi.use(ctx => {
    console.log(ctx);
});

agi.listen(3000, () => console.log("Listening on port 3000..."));