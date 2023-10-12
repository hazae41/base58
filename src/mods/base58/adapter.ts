import { BytesOrCopiable, Copiable } from "@hazae41/box"
import { None, Option } from "@hazae41/option"
import { Result } from "@hazae41/result"
import { DecodeError, EncodeError } from "./errors.js"

let global: Option<Adapter> = new None()

export function get() {
  return global.unwrap()
}

export function set(value?: Adapter) {
  global = Option.wrap(value)
}

export interface Adapter {
  tryEncode(bytes: BytesOrCopiable): Result<string, EncodeError>
  tryDecode(text: string): Result<Copiable, DecodeError>
}

