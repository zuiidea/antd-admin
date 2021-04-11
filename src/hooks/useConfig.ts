import { useContext } from 'react'
import { ConfigContext } from '@/utils/context'

const useConfig = () => {
  return useContext(ConfigContext)
}

export default useConfig
