
import {BitConsumer} from '../source/bitConsumer.js'
import {assert} from './shared.js'

let bc = new BitConsumer(8)
bc.onIntegerReady = integer => assert(integer, 0xEF)
bc.consumeBitsFromInteger(0xABCDEF, 8)
