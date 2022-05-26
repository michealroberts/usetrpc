# useTRPC

A composables Vue 3 library for using a tRPC.io client, bringing end-to-end typesafe APIs to Vue 3.

## Installation

```bash
npm install @trpc/vue
```

or

```bash
yarn(pnpm) add @trpc/vue
```

Then, you can simply import what you need:

```
import { useTRPCClient, useTRPCQuery, useTRPCMutation } from '@trpc/vue'
```

## Usage

Instantiating a tRPC client:

```ts
import { useTRPCClient } from '@trpc/vue'

const { client } = useTRPCClient({
  url: 'http://localhost:3000/trpc'
})
```

## To-Do

- [ ] Fix type inference for useQuery()
- [ ] Add comprehensive usage tests for useClient()
- [ ] Add comprehensive usage tests for useQuery()
- [ ] Add useMutation()
- [ ] Add comprehensive usage tests for useMutation()
- [ ] Add usage documentation and demo examples.
