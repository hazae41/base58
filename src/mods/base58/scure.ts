import { Result } from "@hazae41/result"
import type { base58 } from "@scure/base"
import { Adapter, Copied } from "./base58.js"
import { DecodingError, EncodingError } from "./errors.js"

export function fromScure(scure: typeof base58): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => scure.encode(bytes)).mapErrSync(EncodingError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => scure.decode(text)).mapSync(Copied.new).mapErrSync(DecodingError.from)
  }

  return { tryEncode, tryDecode }
}