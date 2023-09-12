import { Result } from "@hazae41/result"
import type { base58 } from "@scure/base"
import { Adapter, Copied } from "./adapter.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromScure(scure: typeof base58): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => scure.encode(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => scure.decode(text)).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}