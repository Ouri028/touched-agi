# touched-agi

A simple and easy to use FastAGI.

This is was based of TS-AGI.

## Install
```
npm install touched-agi

or

yarn add touched-agi

```

`````javascript



import { Agi } from "touched-agi";

const agi = new Agi();

agi.use(async (ctx: any) => {
    await ctx.getData("beep", 13000, 13);
});

agi.listen(3000, () => {
    console.log("Running on port 3000");
});


`````

### Add to Asterisk extensions.conf

`````
[default]
exten = > 1000,1,AGI(agi://localhost:3000)
`````

## Links

[Asterisk AGI](https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGI+Commands)



***