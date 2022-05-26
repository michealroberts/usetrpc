import type { CreateTRPCClientOptions } from '@trpc/client'

import { createTRPCClient } from '@trpc/client'

import { AnyRouter } from '@trpc/server'

export type UseTRPCClientOptions<TRouter extends AnyRouter> = CreateTRPCClientOptions<TRouter>

/**
 *
 * Creates tRPC Client for query and mutation calls
 *
 * @params options
 * @returns {TRPCClient<AppRouter>}
 */
export function useTRPCClient<TRouter extends AnyRouter>(options: UseTRPCClientOptions<TRouter>) {
  return {
    client: createTRPCClient<TRouter>(options)
  }
}
