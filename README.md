# useTRPC

A composables Vue 3 library for using a tRPC.io client, bringing end-to-end typesafe APIs to Vue 3.

Please reference the tRPC documenation (https://trpc.io/docs/)[https://trpc.io/docs/] before using this library.

**N.B**. *This library is a work in progress and is not yet ready for usage.*

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

Be sure to define a tRPC router of type `AppRputer`, e.g.:

```ts
import * as trpc from '@trpc/server';

export const appRouter = trpc
  .router<Context>()
  .query('hello', {
    resolve({ ctx }) {
      return {
        greeting: `world`,
      };
    },
  });
  
export type AppRouter = typeof appRouter
```

Please see [https://trpc.io/docs/router](https://trpc.io/docs/router) for further explanation of defining the router and the `AppRouter` type.

Instantiating a tRPC client:

```ts
import { useTRPCClient } from '@trpc/vue'

// import your router, e.g.:
import type { AppRouter } from './server/router'

const { client } = useTRPCClient<AppRouter>({
  url: 'http://localhost:3000/trpc'
})
```

## To-Do

- [ ] Publish as npm public package
- [X] Add useClient() composable
- [ ] Add comprehensive usage tests for useClient()
- [X] Add useQuery() composable
- [ ] Improve type inference for useQuery()
- [ ] Add comprehensive usage tests for useQuery()
- [ ] Add useMutation()
- [ ] Add comprehensive usage tests for useMutation()
- [ ] Add usage documentation and demo examples.
