import type { Alocer } from "@hazae41/alocer"
import { Result } from "@hazae41/result"
import { Adapter } from "./adapter.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromAlocer(alocer: typeof Alocer): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => alocer.base58_encode(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => alocer.base58_decode(text)).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}