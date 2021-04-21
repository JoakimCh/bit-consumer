
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

// BigInt overflow
bc = new BitConsumer(36)
bc.onIntegerReady = integer => {
  assert(integer, 0xABCD_ABCDEn)
  bc.onIntegerReady = integer => {
    assert(integer, 0xABCD_ABCDEn)
    bc.onIntegerReady = integer => assert(integer, 0xDDDDEEEEEn)
  }
}
bc.consumeBitsFromInteger(0xABCD_ABCDE_ABCD_ABCDE_DDDDn, 36*2 + 16)
bc.consumeBitsFromInteger(0xEEEEE, 16+4)
