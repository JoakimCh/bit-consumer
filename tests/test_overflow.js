
import {BitConsumer} from '../source/bitConsumer.js'
import {assert} from './shared.js'

let hex = '', bc = new BitConsumer(4)
bc.onIntegerReady = integer => hex += integer.toString(16)
bc.consumeBitsFromInteger(0xABCDEF, 24)
assert(hex, 'abcdef')

bc = new BitConsumer(6)
bc.onIntegerReady = integer => assert(integer, 0b111111)
bc.consumeBitsFromInteger(0b11111100, 8)
bc.onIntegerReady = integer => assert(integer, 0)
bc.consumeBitsFromInteger(0b00001111, 8)
bc.onIntegerReady = integer => {
  assert(integer, 0b111111)
  bc.onIntegerReady = integer => assert(integer, 0)
}
bc.consumeBitsFromInteger(0b11000000, 8)
