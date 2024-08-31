import type Scure from "@scure/base"
import { BytesOrCopiable, Copied } from "libs/copiable/index.js"
import { Adapter } from "./adapter.js"

export function fromScure(scure: typeof Scure) {
  const { base58 } = scure

  function getBytes(bytes: BytesOrCopiable) {
    return "bytes" in bytes ? bytes.bytes : bytes
  }

  function encodeOrThrow(bytes: BytesOrCopiable) {
    return base58.encode(getBytes(bytes))
  }

  function decodeOrThrow(text: string) {
    return new Copied(base58.decode(text))
  }

  return { encodeOrThrow, decodeOrThrow } satisfies Adapter
}