import { describe, expect, it} from 'vitest'

import { useTRPCClient } from '../'

describe('useTRPCClient', () => {
  it('should be defined', () => {
    expect(useTRPCClient).toBeDefined()
  })
})