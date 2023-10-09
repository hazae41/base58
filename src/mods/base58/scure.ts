import { Box, Copiable, Copied } from "@hazae41/box"
import { Result } from "@hazae41/result"
import { base58 } from "@scure/base"
import { Adapter } from "./adapter.js"
import { DecodeError, EncodeError } from "./errors.js"

export function fromScure(): Adapter {

  function tryEncode(bytes: Box<Copiable>) {
    return Result.runAndWrapSync(() => base58.encode(bytes.get().bytes)).mapErrSync(EncodeError.from)
  }

  function tryDecode(text: string) {
    return Result.runAndWrapSync(() => base58.decode(text)).mapSync(Copied.new).mapErrSync(DecodeError.from)
  }

  return { tryEncode, tryDecode }
}