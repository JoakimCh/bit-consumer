
import {BitConsumer} from '../source/bitConsumer.js'
import {assert} from './shared.js'

let bc = new BitConsumer(16)
bc.onIntegerReady = integer => assert(integer, 0xdead)
bc.consumeBitsFromInteger(0xDE, 8)
bc.consumeBitsFromInteger(0xAD, 8)
bc.onIntegerReady = integer => assert(integer, 0xbeef)
bc.consumeBitsFromInteger(0xBE, 8)
bc.consumeBitsFromInteger(0xEF, 8)
bc.consumeBitsFromInteger(0xFF, 8)
assert(bc.integerFromRemains(), 0xFF00)
assert(bc.integerFromRemains(), null)
bc = new BitConsumer(8, integer => assert(integer, 0b11000001))
bc.consumeBits(1,1,0,0, 0,0,0,1, 0,1,0)
assert(bc.integerFromRemains(), 0b01000000)
