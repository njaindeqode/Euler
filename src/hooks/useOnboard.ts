import { API } from 'bnc-onboard/dist/src/interfaces'
import { MyOnboard } from '../utils/sevices'

const useOnboard = () => {
  const onboard: API = MyOnboard
  return { onboard }
}

export default useOnboard
