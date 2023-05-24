import { useEffect, useMemo } from 'react'

import { debounce } from '@/utils/debounce'

export const useDebounce = <A = unknown, R = void>(
  fn: (args: A) => R,
  ms: number
): ((args: A) => Promise<R>) => {
  const [debouncedFun, teardown] = useMemo(
    () => debounce<A, R>(fn, ms),
    [fn, ms]
  )

  useEffect(() => () => teardown(), [])

  return debouncedFun
}
