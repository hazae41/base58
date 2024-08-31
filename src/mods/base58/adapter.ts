import { None, Nullable, Option } from "@hazae41/option"
import { BytesOrCopiable, Copiable } from "libs/copiable/index.js"

let global: Option<Adapter> = new None()

export function get() {
  return global
}

export function set(value: Nullable<Adapter>) {
  global = Option.wrap(value)
}

export interface Adapter {
  encodeOrThrow(bytes: BytesOrCopiable): string
  decodeOrThrow(text: string): Copiable
}

