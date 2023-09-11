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

### Alocer (WebAssembly)

```typescript
import { Base58 } from "@hazae41/base58"
import { Alocer } from "@hazae41/alocer"

await Alocer.initBundledOnce()
const base58 = Base58.fromAlocer(Alocer)

/**
 * Set it globally (optional)
 **/
Base58.set(base58)
```

### Scure (JavaScript)

```typescript
import { Base58 } from "@hazae41/base58"
import * as scure from "@scure/base"

const base58 = Base58.fromScure(scure.base58)

/**
 * Set it globally (optional)
 **/
Base58.set(base58)
```

## Usage

### Direct

```tsx
const encoded: string = base58.tryEncode(new Uint8Array([1,2,3,4,5])).unwrap()
const decoded: Uint8Array = base58.tryDecode(encoded).unwrap().copy()
```