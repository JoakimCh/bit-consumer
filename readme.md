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

<a name="module_bit-consumer.BitConsumer"></a>

### bit-consumer.BitConsumer
A "bit consumer" class allowing you to feed it endless of bits and receive unsigned integers back from them whenever the wanted amount of bits has been consumed. The bits are consumed in the order of the most significant bits first.

**Kind**: static class of [<code>bit-consumer</code>](#module_bit-consumer)  

* [.BitConsumer](#module_bit-consumer.BitConsumer)
    * [new exports.BitConsumer(bitsWanted, [onIntegerReady])](#new_module_bit-consumer.BitConsumer_new)
    * [.onIntegerReady](#module_bit-consumer.BitConsumer+onIntegerReady)
    * [.integerFromRemains()](#module_bit-consumer.BitConsumer+integerFromRemains) ⇒ <code>Number</code> \| <code>BigInt</code>
    * [.consumeBitsFromInteger(integer, bitsToConsume)](#module_bit-consumer.BitConsumer+consumeBitsFromInteger)
    * [.consumeBit(bit)](#module_bit-consumer.BitConsumer+consumeBit)
    * [.consumeBits(...bits)](#module_bit-consumer.BitConsumer+consumeBits)

<a name="new_module_bit-consumer.BitConsumer_new"></a>

#### new exports.BitConsumer(bitsWanted, [onIntegerReady])
**Params**

- bitsWanted <code>number</code> - Each time this many bits has been consumed the `onIntegerReady` callback is called with an integer created from those bits.
- [onIntegerReady] <code>function</code> - The callback function to receive an integer each time the amount of wanted bits has been consumed. If more than 32 bits are wanted then it will receive a `BigInt`. It's optional because it can be set later.

<a name="module_bit-consumer.BitConsumer+onIntegerReady"></a>

#### bitConsumer.onIntegerReady
Set to a callback function to receive an integer each time the amount of wanted bits has been consumed. If more than 32 bits are wanted then it will receive a `BigInt`.

**Kind**: instance property of [<code>BitConsumer</code>](#module_bit-consumer.BitConsumer)  
<a name="module_bit-consumer.BitConsumer+integerFromRemains"></a>

#### bitConsumer.integerFromRemains() ⇒ <code>Number</code> \| <code>BigInt</code>
If the `BitConsumer` has consumed more bits since the last call to the `onIntegerReady` callback and you want to get an integer from them before the count of bits has reached `bitsWanted` then call this function. It returns `null` if no more bits were consumed. This is usually used to flush any remaining bits at the end of consumption.

**Kind**: instance method of [<code>BitConsumer</code>](#module_bit-consumer.BitConsumer)  
<a name="module_bit-consumer.BitConsumer+consumeBitsFromInteger"></a>

#### bitConsumer.consumeBitsFromInteger(integer, bitsToConsume)
The bits must come from somewhere and consuming them from an integer (up to 32 bits) is the fastest way to do it. If you need more bits you can consume them from a BigInt. If the integer has more bits than the amount you want to consume then it will consume the least significant bits of that integer.

**Kind**: instance method of [<code>BitConsumer</code>](#module_bit-consumer.BitConsumer)  
**Params**

- integer <code>number</code> | <code>bigint</code> - The `Number` or `BigInt` to consume bits from.
- bitsToConsume <code>number</code> - The amount of bits to consume.

<a name="module_bit-consumer.BitConsumer+consumeBit"></a>

#### bitConsumer.consumeBit(bit)
If you want to consume just one single lonely bit then this is the command for that. For higher performance consider using `consumeBitsFromInteger` to consume several bits at once.

**Kind**: instance method of [<code>BitConsumer</code>](#module_bit-consumer.BitConsumer)  
**Params**

- bit <code>number</code>

<a name="module_bit-consumer.BitConsumer+consumeBits"></a>

#### bitConsumer.consumeBits(...bits)
Allows you to consume several bits. For higher performance consider using `consumeBitsFromInteger` if possible.

**Kind**: instance method of [<code>BitConsumer</code>](#module_bit-consumer.BitConsumer)  
**Params**

- ...bits <code>number</code>


### End of readme

To get back up [click here](#bit-consumer) (only works on GitHub?) or find your own way.
