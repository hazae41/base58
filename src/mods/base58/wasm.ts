import type { Base58Wasm } from "@hazae41/base58.wasm"
import { Pin, Ref } from "@hazae41/box"
import { BytesOrCopiable } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"

export function fromWasm(wasm: typeof Base58Wasm) {
  const { Memory, base58_encode, base58_decode } = wasm

  function getMemory(bytesOrCopiable: BytesOrCopiable) {
    if (bytesOrCopiable instanceof Memory)
      return new Ref(bytesOrCopiable)

    if (bytesOrCopiable instanceof Uint8Array)
      return Pin.from(new Memory(bytesOrCopiable))

    return Pin.from(new Memory(bytesOrCopiable.bytes))
  }

  function encodeOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return base58_encode(memory.value)
  }

  function decodeOrThrow(text: string) {
    return base58_decode(text)
  }

  return { encodeOrThrow, decodeOrThrow } satisfies Adapter
}