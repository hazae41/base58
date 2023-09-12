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

```bash
npm i @hazae41/alocer
```

```typescript
import { Base58 } from "@hazae41/base58"

Base58.set(await Base58.fromAlocer())
```

### Scure (JavaScript)

```bash
npm i @scure/base
```

```typescript
import { Base58 } from "@hazae41/base58"

Base58.set(Base58.fromScure())
```

## Usage

### Direct

```tsx
const encoded: string = Base58.get().tryEncode(new Uint8Array([1,2,3,4,5])).unwrap()
const decoded: Uint8Array = Base58.get().tryDecode(encoded).unwrap().copy()
```