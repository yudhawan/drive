import React, { useEffect, useState } from 'react'
import {SearchIcon,CalendarIcon,DownloadIcon,TrashIcon,LogoutIcon,FolderAddIcon,FolderIcon,SaveIcon, DotsCircleHorizontalIcon} from '@heroicons/react/outline'
import {logout} from '../features/authSlice'
import {useDispatch,useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {getFile,deleteFile,downloadFile,addDir,getDir,deleteDir,renameDir,moveFile,moveDirectory} from '../features/fileSlice'
function Home() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {files,isLoading,dir} = useSelector(state=>state.file)
    const {user} = useSelector(state=>state.auth)
    const [search,setsearch] = useState('')
    const [adddirectory,setadddirectory] = useState('')
    const [rename,setrename] = useState('')

    const [action,setaction]=useState(null)
    const [actiondir,setactiondir]=useState(null)
    const [opendir,setopendir]=useState(0)
    const [openfile,setopenfile]=useState(null)

    const [validation,setvalidation]=useState('')
    function addDirectory(){
        const cekdir = dir.find(x=>x.nama===adddirectory)
        if(cekdir) return setvalidation('Directory already exist')
        setadddirectory('')
        setvalidation('')
        return dispatch(addDir({nama:adddirectory,userId:user.id,parent:0}))
    }
    function renameDirectory(id){
        const cekdir = dir.find(x=>x.nama===rename)
        if(cekdir) return setvalidation('Directory already exist')
        setrename('')
        setvalidation('')
        return dispatch(renameDir({id:id, rename:rename}))
    }
    function movefile(id,dirId){
        if(!dirId) return setvalidation('Please select directory')
        setvalidation('')
        return dispatch(moveFile({id:id,dirId:dirId}))
    }
    function movedirectory(id,dirId){
        if(!dirId) return setvalidation('Please select directory')
        setvalidation('')
        return dispatch(moveDirectory({id:id,dirId:dirId}))
    }
    useEffect(() => {
        dispatch(getFile())
        dispatch(getDir())
    },[])
  return (
    <div className='flex flex-col space-y-2 lg:space-y-5 w-full'>
        <div className='flex flex-col lg:flex-row space-x-1 lg:space-x-2 w-full items-center space-y-2 lg:space-y-0'>
            <div className='flex flex-row lg:flex-col w-80'>
                <p className="text-gray-500 hidden lg:block">Interconnection Drive System</p>
                <p className="text-gray-500 font-semibold hidden lg:block">Piranti Lunak</p>
                <p className='text-xs text-gray-500 self-start font-semibold block lg:hidden'>Interconnection Drive System : Piranti Lunak</p>
            </div>
            <div className='flex space-x-1 items-center border border-gray-400 rounded-md w-full p-2'>
                <SearchIcon className='h-6 w-6 text-gray-400' />
                <input type="text" placeholder='Search...' onChange={(e)=>setsearch(e.target.value) } value={search} className='outline-none w-full bg-transparent text-gray-400' />
            </div>
            <form onSubmit={(e)=> {
                e.preventDefault()
                addDirectory()                
                }} className='flex space-x-1 items-center border border-gray-400 rounded-md w-full p-2'>
                <input type="text" placeholder={'Tambahkan Folder'} onChange={(e)=>setadddirectory(e.target.value) } value={adddirectory} className='outline-none w-full bg-transparent text-gray-400' />
                <FolderAddIcon className='h-6 w-6 text-gray-400 cursor-pointer' onClick={()=>addDirectory()} />
            </form>
            <button className='rounded-md bg-gray-500 flex items-center px-2 py-1 hover:bg-rose-700 space-x-1' 
            onClick={()=> dispatch(logout())}>
                <LogoutIcon className='h-5 w-5 text-gray-200' />
                <p className='text-gray-200 text-sm'>Logout</p>
            </button>
        </div>
        <div className='flex-col space-y-1'>
            <div className='flex space-x-2 w-full lg:space-x-10'>
                {(opendir!=0)&&<p className='text-gray-600 text-sm underline self-end cursor-pointer' onClick={()=>{
                    setopendir(0)
                    setopenfile(null)
                    }}>Home</p>}
                {validation&&<p className='text-rose-600 font-semibold text-sm'>{validation}</p>}
                {!validation&&<p className='text-sm text-orange-600'>{dir?.filter(val=> val.parent==opendir)?.length} Folders </p>}
            </div>
            <div className='flex flex-wrap gap-4 w-full h-full border-t border-blue-200 py-2 lg:py-5 justify-center'>
                {
                    isLoading?[1,2,3,4,5].map(items=><div key={items} className='flex flex-col justify-center p-2 items-center w-44 h-52 border border-gray-200 hover:border-blue-300 rounded-lg space-y-2'>
                        <div className='w-36 h-36 rounded-lg bg-gray-300 animate-pulse'></div>
                        <div className='w-24 h-4 bg-gray-300 animate-pulse self-start'></div>
                        <div className='w-20 h-4 bg-gray-300 animate-pulse self-start'></div>
                    </div>):
                    dir?.filter(val=> val.parent==opendir)?.map((items,index)=> {
                        let date = new Date(items.updatedAt).toISOString().substring(0,10)
                        return(
                            <div key={index+1} className='flex flex-col justify-center p-1 space-y-1 items-center w-40 h-48 border hover:border-yellow-300 rounded-lg relative' onDoubleClick={()=>{
                                setopendir(items.id)
                                setopenfile(items.id)
                                }}>
                                {(actiondir!=items.id)?<DotsCircleHorizontalIcon className='h-6 w-6 text-gray-400 hover:text-indigo-400 cursor-pointer absolute top-2 right-2' onClick={()=> setactiondir(items.id)} />:<></>}
                                    {
                                        (actiondir==items.id)?
                                        <div className='w-36 h-36 flex justify-center items-center bg-orange-500 rounded-lg'>
                                            <div className='relative flex flex-col space-y-4 bg-orange-500 rounded-lg px-1'>
                                                <form onSubmit={(e)=>{
                                                    e.preventDefault()
                                                    renameDirectory(items.id)
                                                    setactiondir(null)
                                                }} className='bg-orange-100 p-1 rounded-md border border-gray-600'>
                                                    <input type="text" value={rename?rename:items.nama} onChange={(e)=> setrename(e.target.value)} className="outline-none w-full text-gray-500" />
                                                </form>
                                                <div className='rounded-md border border-orange-200 p-1'>
                                                    <select className='w-full outline-none bg-transparent text-gray-100' onChange={(e)=>{
                                                        movedirectory(items.id,e.target.value)
                                                        setactiondir(null)
                                                        }}>
                                                        <option selected disabled>Pindah Ke </option>
                                                        <option value="0" className='text-green-600'>Home</option>
                                                        {
                                                            dir?.filter(val => val.nama!==items.nama)?.map((items,index)=> <option className='text-gray-600' key={index+1} value={items.id}>{items.nama}</option>)
                                                        }
                                                    </select>
                                                </div>
                                                <div className='flex space-x-1 justify-between'>
                                                    <button className="w-fit flex space-x-1 items-center border border-rose-700 bg-rose-700 p-1 rounded-md" onClick={()=>dispatch(deleteDir({id:items.id}))}><TrashIcon className='text-white w-5 h-5' /></button>
                                                </div>
                                            </div>
                                        </div>:   
                                        <FolderIcon className='h-36 w-36 text-orange-500' />
                                    }
                                <p className='text-xs text-gray-600 font-semibold line-clamp-1'>{items.nama}</p>
                                <div className="flex space-x-1 self-start items-center mt-2">
                                    <CalendarIcon className='text-green-500 w-4 h-4 ' />
                                    <h5 className='text-gray-600 text-xs'>{date}</h5>
                                </div>
                            </div>
                        )
                    })

                }
            </div>
        </div>
        <p className='text-sm text-gray-600'>{files?.filter(val => val.directoryId==openfile)?.length} Files </p>
        <div className='flex flex-wrap gap-4 w-full h-full border-t border-blue-200 py-2 lg:py-5 justify-center'>
            {
                isLoading?[1,2,3,4,5].map(items=><div key={items} className='flex flex-col justify-center p-2 items-center w-44 h-52 border border-gray-200 hover:border-blue-300 rounded-lg space-y-2'>
                    <div className='w-36 h-36 rounded-lg bg-gray-300 animate-pulse'></div>
                    <div className='w-24 h-4 bg-gray-300 animate-pulse self-start'></div>
                    <div className='w-20 h-4 bg-gray-300 animate-pulse self-start'></div>
                </div>):
                files?.filter(val => val.directoryId==openfile).filter(value=> value.originalName.toLowerCase().includes(search.toLowerCase())).map((items,index)=>{
                let extension = items.originalName.split('.').pop()
                let date = new Date(items.createdAt).toISOString().substring(0,10)
                return(<div key={index+1} className='flex flex-col justify-center p-2 items-center w-40 h-48 border border-gray-200 hover:border-blue-300 rounded-lg cursor-pointer' onClick={()=>setaction(items.id)}>
                <div className='w-36 h-36 flex justify-center items-center bg-gray-500 rounded-lg'>
                    {
                        (action===items.id)?<div className='relative flex flex-col space-y-4 bg-gray-500 rounded-lg px-2'>
                        <div className='rounded-md border border-orange-200 p-1'>
                            <select className='w-full outline-none bg-transparent text-gray-100' onChange={(e)=>{
                                movefile(items.id,e.target.value)
                                setaction(null)
                                }}>
                                <option selected disabled>Pindah Ke </option>
                                <option value="0" className='text-green-600'>Home</option>
                                {
                                    dir?.map((items,index)=> <option className='text-gray-600' key={index+1} value={items.id}>{items.nama}</option>)
                                }
                            </select>
                        </div>
                        <div className='flex space-x-1'>
                            <button className="flex space-x-1 items-center border border-green-400 bg-green-400 p-1 rounded-md w-fit" onClick={()=>dispatch(downloadFile({filename:items.name,originalname:items.originalName,dir:items.maindir}))}><DownloadIcon className='text-white w-5 h-5' /></button>
                            <button className="flex space-x-1 items-center border border-rose-400 bg-rose-400 p-1 rounded-md w-fit" onClick={()=>dispatch(deleteFile({idfile:items.id,filename:items.name,dir:items.maindir}))}><TrashIcon className='text-white w-5 h-5' /></button>
                        </div>
                        </div>:
                        <h4 className='text-gray-200 text-3xl'>{extension}</h4>
                    }
                </div>
                <h5 className='text-gray-600 text-xs font-semibold line-clamp-1 self-start'>{items.originalName}</h5>
                <div className="flex space-x-1 self-start items-center mt-1">
                    <CalendarIcon className='text-green-500 w-4 h-4 ' />
                    <h5 className='text-gray-600 text-xs'>{date}</h5>
                </div>
                </div>)})
            }
        </div>
    </div>
  )
}

export default Home