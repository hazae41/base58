# Base58

Base58 adapter for WebAssembly and JS implementations

```bash
npm i @hazae41/base58
```

[**Node Package 📦**](https://www.npmjs.com/package/@hazae41/base58)

## Features

### Current features
- 100% TypeScript and ESM
- No external dependencies

## Getting started

### WebAssembly

```bash
npm i @hazae41/base58.wasm
```

```typescript
import { Base58 } from "@hazae41/base58"
import { Base58Wasm } from "@hazae41/base58.wasm"

Base58.set(await Base58.fromWasm(Base58Wasm))
```

### Scure (JavaScript)

```bash
npm i @scure/base
```

```typescript
import { Base58 } from "@hazae41/base58"
import * as Scure from "@scure/base"

Base58.set(Base58.fromScure(Scure))
```

## Usage

### Direct

```tsx
const encoded: string = Base58.get().getOrThrow().encodeOrThrow(new Uint8Array([1,2,3,4,5]))
using decoded: Copiable = Base58.get().getOrThrow().decodeOrThrow(encoded)
const decoded2: Uint8Array = decoded.bytes.slice()
```