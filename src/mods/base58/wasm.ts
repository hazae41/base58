import type { Base58Wasm } from "@hazae41/base58.wasm"
import { Box } from "@hazae41/box"
import { BytesOrCopiable } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"

export async function fromWasm(wasm: typeof Base58Wasm) {
  const { initBundled, Memory, base58_encode, base58_decode } = wasm

  await initBundled()

  function getMemory(bytesOrCopiable: BytesOrCopiable) {
    if (bytesOrCopiable instanceof Memory)
      return Box.createAsMoved(bytesOrCopiable)
    if (bytesOrCopiable instanceof Uint8Array)
      return Box.create(new Memory(bytesOrCopiable))
    return Box.create(new Memory(bytesOrCopiable.bytes))
  }

  function encodeOrThrow(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return base58_encode(memory.inner)
  }

  function decodeOrThrow(text: string) {
    return base58_decode(text)
  }

  return { encodeOrThrow, decodeOrThrow } satisfies Adapter
}