import "@hazae41/symbol-dispose-polyfill"

import { assert, test } from "@hazae41/phobos"
import { fromScure } from "./scure.js"
import { fromWasm } from "./wasm.js"

import { Base58Wasm } from "@hazae41/base58.wasm"
import * as Scure from "@scure/base"

test("encode and decode", async ({ message }) => {
  const scure = fromScure(Scure)
  const encodeda = scure.encodeOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
  using decodeda = scure.decodeOrThrow(encodeda)

  console.log(encodeda, decodeda.bytes)

  const alocer = await fromWasm(Base58Wasm)
  const encodedb = alocer.encodeOrThrow(new Uint8Array([1, 2, 3, 4, 5, 6, 7]))
  const decodedb = alocer.decodeOrThrow(encodedb)

  console.log(encodedb, decodedb.bytes)

  assert(encodeda === encodedb)
  assert(Buffer.from(decodeda.bytes).equals(Buffer.from(decodedb.bytes)))
})