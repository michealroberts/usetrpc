import { ref } from 'vue'

import type {
  ProcedureRecord,
  inferHandlerInput,
  inferProcedureInput,
  inferProcedureOutput,
  ThenArg
} from '@trpc/server'

import { AnyRouter } from '@trpc/server'

import type { TRPCClient } from '@trpc/client'

export type inferProcedures<TObj extends ProcedureRecord<any, any, any, any, any, any>> = {
  [TPath in keyof TObj]: {
    input: inferProcedureInput<TObj[TPath]>
    output: inferProcedureOutput<TObj[TPath]>
  }
}

export function useTRPCQuery<
  AppRouter extends AnyRouter,
  TPath extends keyof inferProcedures<AppRouter['_def']['queries']> & string
>(
  client: TRPCClient<AppRouter>,
  pathAndInput: [path: TPath, ...args: inferHandlerInput<AppRouter['_def']['queries'][TPath]>]
) {
  const response = ref<Awaited<ThenArg<ReturnType<AppRouter['_def']['queries'][TPath]['call']>>>>()

  const fetchQuery = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = await client.query(...pathAndInput)
    response.value = data
  }

  const refetchQuery = async () => {
    fetchQuery()
  }

  ;(async () => {
    fetchQuery()
  })()

  return {
    response,
    fetchQuery,
    refetchQuery
  }
}