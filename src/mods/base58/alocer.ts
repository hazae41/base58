import { Alocer } from "@hazae41/alocer"
import { Box, Copiable } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { Adapter } from "./adapter.js"
import { DecodeError, EncodeError } from "./errors.js"

export async function fromAlocer(): Promise<Adapter> {
  await Alocer.initBundledOnce()

  function tryEncode(bytes: Box<Copiable>) {
    return Result.runAndWrapSync(() => Alocer.base58_encode(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => Alocer.base58_decode(text)).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}