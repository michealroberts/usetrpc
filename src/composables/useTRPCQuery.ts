import { ref } from 'vue'

import type {
  ProcedureRecord,
  inferHandlerInput,
  inferProcedureInput,
  inferProcedureOutput
} from '@trpc/server'

import { AnyRouter } from '@trpc/server'

import type { TRPCClient, TRPCClientErrorLike } from '@trpc/client'

/**
 *
 * This is a helper method to infer the output of a query resolver
 *
 */
export type inferQueryOutput<TRouter extends AnyRouter, TRouteKey extends keyof TRouter['_def']['queries']> = inferProcedureOutput<
  TRouter['_def']['queries'][TRouteKey]
>

/**
 *
 * This is a helper method to infer the input of a query resolver
 *
 */
export type inferQueryInput<TRouter extends AnyRouter, TRouteKey extends keyof TRouter['_def']['queries']> = inferProcedureInput<
  TRouter['_def']['queries'][TRouteKey]
>

export type inferProcedures<TObj extends ProcedureRecord<any, any, any, any, any, any>> = {
  [TPath in keyof TObj]: {
    input: inferProcedureInput<TObj[TPath]>
    output: inferProcedureOutput<TObj[TPath]>
  }
}

export type TQueries<TRouter extends AnyRouter> = TRouter['_def']['queries']

export type TError<TRouter extends AnyRouter> = TRPCClientErrorLike<TRouter>

export type TQueryValues<TRouter extends AnyRouter> = inferProcedures<TRouter['_def']['queries']>

export type TPath<TRouter extends AnyRouter> = keyof TQueryValues<TRouter> & string

export function useTRPCQuery<TRouter extends AnyRouter>(
  client: TRPCClient<TRouter>,
  path: TPath<TRouter>, 
  ...args: inferHandlerInput<TQueries<TRouter>[TPath<TRouter>]>
) {
  const response = ref<inferQueryOutput<TRouter, TPath<TRouter>>>()

  ;(async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment     
    // @ts-ignore
    const data = await client.query(path, ...args)
    response.value = data
  })()

  return response
}