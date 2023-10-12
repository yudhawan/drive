import { useEffect } from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {servicesAuth} from '../features/authSlice'
function useAuth() {
  const dispatch = useDispatch()
  const {token} = useSelector(state=>state.auth)
  useEffect(()=>{
    dispatch(servicesAuth())
  },[])
  return {token}
}

export default useAuth