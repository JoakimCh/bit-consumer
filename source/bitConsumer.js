/**
 * @module bit-consumer
 */

function bitmask(width) { // up to 53 bits
  // see: https://stackoverflow.com/questions/39660274/create-variable-width-bitmasks-0-32-bits-in-javascript
  return 2**width - 1
  // return width && -1 >>> 32 - width;
  //return Math.pow(2, width) - 1
}
function bitmaskBigInt(width) {
  return 2n**BigInt(width) - 1n
}

/**
 * A "bit consumer" class allowing you to feed it endless of bits and receive unsigned integers back from them whenever the wanted amount of bits has been consumed. The bits are consumed in the order of the most significant bits first.
 */
 export class BitConsumer {
  #bitsWanted; #bitIndex; #integerFromBits; #onIntegerReady; #bigInt
  /**
   * @param {number} bitsWanted Each time this many bits has been consumed the `onIntegerReady` callback is called with an integer created from those bits.
   * @param {function} [onIntegerReady] The callback function to receive an integer each time the amount of wanted bits has been consumed. If more than 53 bits are wanted then it will receive a `BigInt`. It's optional because it can be set later.
   */
  constructor(bitsWanted, onIntegerReady = function(){}) {
    if (bitsWanted > 53) this.#bigInt = true
    this.#bitsWanted = bitsWanted
    this.#bitIndex = bitsWanted
    this.#integerFromBits = this.#bigInt ? 0n : 0
    this.#onIntegerReady = onIntegerReady
  }
  /** Set to a callback function to receive an integer each time the amount of wanted bits has been consumed. If more than 53 bits are wanted then it will receive a `BigInt`.
  */
  set onIntegerReady(callback) {
    if (typeof callback == 'function')
      this.#onIntegerReady = callback
    else
      throw Error('onIntegerReady is not a function!')
  }
  /** If the `BitConsumer` has consumed more bits since the last call to the `onIntegerReady` callback and you want to get an integer from them before the count of bits has reached `bitsWanted` then call this function. It returns `null` if no more bits were consumed. This is usually used to flush any remaining bits at the end of consumption. 
   * @returns {(Number|BigInt)}
  */
  integerFromRemains() {
    if (this.#bitIndex < this.#bitsWanted) {
      const result = this.#integerFromBits
      this.#bitIndex = this.#bitsWanted
      this.#integerFromBits = this.#bigInt ? 0n : 0
      return result
    }
    return null
  }
  
  /**
   * The bits must come from somewhere and consuming them from an integer (up to 53 bits) is the fastest way to do it. If you need more bits you can consume them from a BigInt. If the integer has more bits than the amount you want to consume then it will consume the least significant bits of that integer.
   * @param {(number|bigint)} integer The `Number` or `BigInt` to consume bits from.
   * @param {number} bitsToConsume The amount of bits to consume.
   */
  consumeBitsFromInteger(integer, bitsToConsume) {
    if (typeof bitsToConsume != 'number') throw Error('bitsToConsume must be a number, not: '+typeof bitsToConsume)

    // if bitsToConsume will overflow the amount of bits needed for the next integer
    if (this.#bitIndex - bitsToConsume < 0) {
      let consumedBits = 0
      while(consumedBits < bitsToConsume) {
        let numConsumable = this.#bitIndex
        if (numConsumable > bitsToConsume-consumedBits) {
          numConsumable = bitsToConsume-consumedBits
        }
        this.consumeBitsFromInteger(integer >> (bitsToConsume-(consumedBits+numConsumable)), numConsumable)
        consumedBits += numConsumable
      }
      return
    }

    this.#bitIndex -= bitsToConsume
    if (typeof integer == 'bigint') {
      if (!this.#bigInt) throw Error('With '+this.#bitsWanted+' bits wanted don\'t consume bits from a BigInt (convert it to a number).')
      integer &= bitmaskBigInt(bitsToConsume)
      this.#integerFromBits |= integer << BigInt(this.#bitIndex)
    } else if (bitsToConsume > 53) {
      throw Error('If you want to consume more than 53 bits from an integer then it must be a BigInt.')
    } else if (this.#bigInt) {
      integer &= bitmask(bitsToConsume)
      this.#integerFromBits |= BigInt(integer) << BigInt(this.#bitIndex)
    } else {
      integer &= bitmask(bitsToConsume)
      this.#integerFromBits |= integer << this.#bitIndex
    }

    if (this.#bitIndex == 0) {
      this.#onIntegerReady(this.#integerFromBits)
      this.#bitIndex = this.#bitsWanted
      this.#integerFromBits = this.#bigInt ? 0n : 0
    }
  }
  /**
   * If you want to consume just one single lonely bit then this is the command for that. For higher performance consider using `consumeBitsFromInteger` to consume several bits at once.
   * @param {number} bit 
   */
  consumeBit(bit) {
    this.consumeBitsFromInteger(bit, 1)
  }
  /**
   * Allows you to consume several bits. For higher performance consider using `consumeBitsFromInteger` if possible.
   * @param  {...number} bits 
   */
  consumeBits(...bits) {
    for (const bit of bits) {
      this.consumeBitsFromInteger(bit, 1)
    }
  }
}
