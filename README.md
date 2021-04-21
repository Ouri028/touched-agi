# touched-agi
node.js lib writed on typescript for Fast AGI (Asterisk Gateway Interface) server. 

A fork and modified version of ts-agi which will see if the Asterisk channel is still open or if the caller dropped the call. This will resolve Auto-Destruct issues on Asterisk when using ts-agi.

[Fork of ding-dong](https://github.com/antirek/ding-dong)


[Fork of ts-agi](https://github.com/sergey12313/ts-agi)


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
  await StreamFile(ctx, 'beep');
  const dtmf = await GetData(ctx, "beep", 8000, 13);
  await SayDigits(ctx, dtmf);
  await ctx.hangup();
});
agi.listen(3000);


`````

### Add to Asterisk extensions.conf

`````
[default]
exten = > 1000,1,AGI(agi://localhost:3000)
`````

## Links

[Asterisk AGI](https://wiki.asterisk.org/wiki/display/AST/Asterisk+17+AGI+Commands)