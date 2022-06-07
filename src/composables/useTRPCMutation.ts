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

export function useTRPCMutation<
  AppRouter extends AnyRouter,
  TPath extends keyof inferProcedures<AppRouter['_def']['mutations']> & string
>(
  client: TRPCClient<AppRouter>,
  pathAndInput: [path: TPath, ...args: inferHandlerInput<AppRouter['_def']['mutations'][TPath]>]
) {
  const response = ref<Awaited<ThenArg<ReturnType<AppRouter['_def']['mutations'][TPath]['call']>>>>()

  const performMutation = async () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    const data = await client.mutation(...pathAndInput)
    response.value = data
  }

  return {
    response,
    performMutation
  }
}