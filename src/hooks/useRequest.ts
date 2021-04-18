import { useEffect, useState, useCallback } from 'react'

interface Options<R, P, RR> {
  onSuccess?: (data: R, params?: P) => void
  onError?: (e: Error, params?: P) => void
  formatResult?: (data: RR) => R
  manual?: boolean
  initialData?: R
}

const useFetch = <R = any, P = any, RR = any>(
  service: any,
  options: Options<R, P, RR>
) => {
  const { initialData, manual, formatResult, onSuccess, onError } = options
  const [loading, setLoading] = useState<boolean>(false)
  const [data, setData] = useState<R>(initialData as R)
  const [error, setError] = useState<any>(null)

  const run = useCallback(
    (params?: P) => {
      setLoading(true)
      return service(params)
        .then((result) => {
          const resultData = formatResult ? formatResult(result) : result
          setData(resultData)
          onSuccess && onSuccess(resultData, params)
        })
        .catch((result) => {
          setError(result || new Error())
          onError && onError(result, params)
        })
        .finally(() => {
          setLoading(false)
        })
    },
    [formatResult, onError, onSuccess, service]
  )

  useEffect(() => {
    if (manual) {
      return
    }
    run()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return {
    run,
    data,
    error,
    loading,
  }
}

export default useFetch
