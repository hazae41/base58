import { Result } from "@hazae41/result"
import { base58 } from "@scure/base"
import { Adapter, Copied } from "./adapter.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromScure(): Adapter {

  function tryEncode(bytes: Uint8Array) {
    return Result.runAndWrapSync(() => base58.encode(bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => base58.decode(text)).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}