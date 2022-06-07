# useTRPC

A composables Vue 3 library for using a tRPC.io client, bringing end-to-end typesafe APIs to Vue 3.

Please reference the tRPC documenation (https://trpc.io/docs/)[https://trpc.io/docs/] before using this library.

**N.B**. *This library is a work in progress and is not yet ready for usage in production.*

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

### Define AppRouter

Be sure to define a tRPC router of type `AppRputer`, e.g.:

```ts
import * as trpc from '@trpc/server';

export const appRouter = trpc
  .router<Context>()
  .query('all', {
    resolve({ ctx }) {
      return {
        greeting: `world`,
      };
    },
  });
  
export type AppRouter = typeof appRouter
```

Please see [https://trpc.io/docs/router](https://trpc.io/docs/router) for further explanation of defining the router and the `AppRouter` type.

### Instantiating a tRPC client:

```ts
import { useTRPCClient } from '@trpc/vue'

// import your router, e.g.:
import type { AppRouter } from './server/router'

const { client } = useTRPCClient<AppRouter>({
  url: 'http://localhost:3000/trpc'
})
```

### Making a tRPC Query

```ts
import { TRPCClient } from '@trpc/client'

import type { AppRouter } from '@observerly/pleiades'

import { useTRPCQuery } from '@trpc/vue'

export const useTelescopes = (client: TRPCClient<AppRouter>) => {
  const telescopes = useTRPCQuery(client, ['telescopes.all'])

  return {
    telescopes
  }
}
```

## To-Do

- [ ] Publish as npm public package
- [X] Add useClient() composable
- [ ] Add comprehensive usage tests for useClient()
- [X] Add useQuery() composable
- [X] Improve type inference for useQuery()
- [ ] Add comprehensive usage tests for useQuery()
- [X] Add useMutation()
- [ ] Add comprehensive usage tests for useMutation()
- [ ] Add useSubscription()
- [ ] Add comprehensive usage tests for useSubscription()
- [ ] Add usage documentation and demo examples.
