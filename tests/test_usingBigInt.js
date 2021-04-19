
import {BitConsumer} from '../source/bitConsumer.js'
import {assert} from './shared.js'

const bigInt = 12345678900987654321n // a 64-bit BigInt
let bc = new BitConsumer(64)
bc.onIntegerReady = integer => assert(integer, bigInt)
bc.consumeBitsFromInteger(bigInt, 64)
bc.consumeBitsFromInteger(255, 8)
assert(bc.integerFromRemains(), 0xFF000000_00000000n)
assert(bc.integerFromRemains(), null)
bc.consumeBitsFromInteger(bigInt, 64)

bc.consumeBitsFromInteger(0xDE, 8)
bc.consumeBitsFromInteger(0xAD, 8)
bc.consumeBitsFromInteger(0xBE, 8)
bc.consumeBitsFromInteger(0xEF, 8)
assert(bc.integerFromRemains(), 0xDEADBEEF_00000000n)

bc.onIntegerReady = integer => assert(integer, 0xCAFE_BABE_B00B_B00Bn)
bc.consumeBitsFromInteger(0xCAFE_BABE_B00B_B00Bn, 64)
// these are serious tests, shut up...
bc.onIntegerReady = integer => assert(integer, 0xBAAD_F00D_DEAD_BEEFn)
bc.consumeBitsFromInteger(0xBAAD_F00D_DEAD_BEEFn, 64)
