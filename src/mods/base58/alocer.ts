import { Alocer } from "@hazae41/alocer"
import { Box, BytesOrCopiable } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { Adapter } from "./adapter.js"
import { DecodeError, EncodeError } from "./errors.js"

export async function fromAlocer(): Promise<Adapter> {
  await Alocer.initBundledOnce()

  function getMemory(bytesOrCopiable: BytesOrCopiable) {
    if (bytesOrCopiable instanceof Alocer.Memory)
      return Box.greedy(bytesOrCopiable)
    if (bytesOrCopiable instanceof Uint8Array)
      return Box.new(new Alocer.Memory(bytesOrCopiable))
    return Box.new(new Alocer.Memory(bytesOrCopiable.bytes))
  }

  function tryEncode(bytes: BytesOrCopiable) {
    using memory = getMemory(bytes)

    return Result.runAndWrapSync(() => {
      return Alocer.base58_encode(memory.inner)
    }).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => {
      return Alocer.base58_decode(text)
    }).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}