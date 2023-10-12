import React, { useEffect, useRef, useState } from 'react'
import {PlusIcon,CloudUploadIcon,DocumentIcon,ChevronLeftIcon} from '@heroicons/react/outline'
import { useNavigate } from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import {addFile} from '../features/fileSlice'
function Upload() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const {user} = useSelector(state=>state.auth)
  const {isLoading,error} = useSelector(state=>state.file)
  const img = useRef(null)
  const [images,setimages]=useState()
  const [validation,setvalidation] = useState('')
  function handleSubmit(){
    if(images===null || images?.length==0) return setvalidation('Please select a file')
    setvalidation('')
    return submit()
  }
  const submit = ()=> dispatch(addFile({images:images,id:user.id,dir:'drive',directoryId:''}))
  return (
    <div className='flex flex-col space-y-2 lg:space-y-4 w-full h-fit p-2 lg:p-4 justify-center items-center'>
      <div className='self-start text-blue-600 flex items-center cursor-pointer' onClick={()=>navigate('/')}>
        <ChevronLeftIcon className='w-8 h-8 text-blue-600' />
        <p>Back</p>
      </div>
      <h4 className='text-gray-600'>Add your Files here</h4>
      <input ref={img} hidden type='file' multiple  onChange={(e)=> setimages(e.target.files)} accept="image/*,video/*,audio/*,.zip,.rar,.doc,.docx,.txt,.pdf,.xlsx,.xls,.xlsm,.xlsb,.csv,.pptx,.pptm,.ppt" />
      <div className='bg-gray-400 rounded-md w-52 h-52 flex justify-center items-center cursor-pointer' onClick={()=> img.current.click()}>
        {
          isLoading?
          <>
            <div className='flex justify-center items-center rounded-full bg-green-200 border-t-8 border-r-8 border-t-gray-400 rotate-45 animate-spin w-40 h-40'>
            </div>
          </>:<>
          {
            images?<DocumentIcon className='text-white w-44 h-44' />
            :<PlusIcon className='text-white w-44 h-44' />        
          }
          </>
        }
        
        
      </div>
      {
        isLoading&&<p className='bg-slate-200 px-2 py-1 rounded-md text-gray-500'>Please wait, Uploading to Drive...</p>
      }
      <button className='bg-green-500 rounded-md w-fit flex items-center px-2 py-1 space-x-1' onClick={handleSubmit}>
        <CloudUploadIcon className='text-white w-8 h-8' />
        <p className='text-white'>Upload</p>
      </button>
      {validation?<p className='text-red-500 text-xs font-semibold'>{validation}</p>:<></>}
    </div>
  )
}

export default Upload