# bit-consumer

### Description
An [ES module](https://flaviocopes.com/es-modules/) providing a "bit consumer" class allowing you to feed it endless of bits and receive unsigned integers back from them whenever the wanted amount of bits has been consumed. The bits are consumed in the order of the most significant bits first.

### Example

```js
import {BitConsumer} from 'bit-consumer'

let bc = new BitConsumer(16)
bc.onIntegerReady = integer => console.log(integer.toString(16))
bc.consumeBitsFromInteger(0xDE, 8)
bc.consumeBitsFromInteger(0xAD, 8)
bc.consumeBitsFromInteger(0xBEEF, 16)
bc.consumeBitsFromInteger(0xFF, 8)
console.log(bc.integerFromRemains().toString(16))

bc = new BitConsumer(8, integer => console.log(integer.toString(2)))
bc.consumeBits(1,1,0,0, 0,0,0,1, 0,1,0)
console.log(bc.integerFromRemains().toString(2))
```
#### Console output from example:
```
dead
beef
ff00
11000001
1000000
```

### Supported platforms

* [Node.js](https://nodejs.org)
* [Deno](https://deno.land)
* A proper browser ([Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)) based usually) or just [Babel](https://babeljs.io) the shit out of it if you need legacy support.

### How to use

#### Install using [NPM](https://www.npmjs.com/)

```shell
npm i bit-consumer
```

#### Import the ES module into Node.js

```js
import {BitConsumer} from 'bit-consumer'
```
Got problems using ES modules? [Click here](https://stackoverflow.com/questions/45854169/how-can-i-use-an-es6-import-in-node-js/56350495#56350495) or [read this](https://nodejs.org/api/esm.html).

#### Import the ES module into the browser or Deno

```js
import {BitConsumer} from '/node_modules/bit-consumer/source/bitConsumer.js'
```

Cumbersome? Consider using [import maps](https://github.com/WICG/import-maps#readme) so you can import it just like in Node.js. Also see the [Deno specific documentation](https://deno.land/manual/linking_to_external_code/import_maps) for import maps if using Deno.

### Funding

If you find this useful then please consider helping me out (I'm jobless and sick). For more information visit my [GitHub sponsors page](https://github.com/sponsors/JoakimCh), my [profile](https://github.com/JoakimCh) or my [simple website](https://joakimch.github.io/funding.html).

# Auto-generated API documentation (from JSDoc)

{{#module name="bit-consumer"}}
{{>members~}}
{{/module}}

### End of readme

To get back up [click here](#bit-consumer) (only works on GitHub?) or find your own way.
