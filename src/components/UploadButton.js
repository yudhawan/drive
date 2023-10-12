import React from 'react'
import {PlusIcon} from '@heroicons/react/outline'
import {useNavigate,useLocation} from 'react-router-dom'
function UploadButton() {
    const navigate = useNavigate()
    const {pathname} = useLocation()
  return (
    <div className={(pathname==='/upload')?'hidden':'block'+'flex justify-center items-center rounded-full bg-blue-500 p-4 fixed lg:bottom-14 lg:right-40 bottom-10 right-2 cursor-pointer'} onClick={()=>navigate('/upload')}>
        <PlusIcon className='text-white w-8 h-8' />
    </div>
  )
}

export default UploadButton