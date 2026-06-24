import '../../App.css'
import ShihTzuIcon from '../../assets/components/mochi_icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faFolder, faGear, faHouse, faList } from '@fortawesome/free-solid-svg-icons';
import { faDochub } from '@fortawesome/free-brands-svg-icons';
import DocumentModule from './modules/documents/documents';
import { useEffect,useState } from 'react';


 export default function CustomerHome(){
    const[fullName,setFullName]= " ";
    
    
    return(
        <div className="w-full flex flex-col justify-start pt-5 items-center h-screen bg-black p-0 ">
            <div className='w-full h-1/16 flex justify-start items-center p-1 '>
                <ShihTzuIcon/> 
                <h1 className="text-lg font-mono bg-gradient-to-r from-purple-700 to-purple-200 bg-clip-text text-transparent">
                    MochieAI
                </h1>
                <div className='w-full h-full flex justify-end items-center '>
                    <div className='w-1/4 flex items-center justify-end px-5 h-full gap-2'>
                        <div className='flex flex-col w-full justify-end items-end text-end text-white font-semi'>
                            <p className='text-md'>
                                Nathaniel Oliver L. De Guzman
                            </p>
                            <h1 className='text-xs text-gray-400'>
                                Admin
                            </h1>

                        </div>
                        <img src="/downprof.jpg" alt="meow" className='w-13 rounded-full h-13' />
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex justify-start items-center gap-2 p-4 m-1 '>
                <div className='rounded-2xl h-full min-w-1/20 bg-gradient-to-b from-gray-700/60 via-black/10 to-violet-700/20 backdrop-blur-md backdrop-saturate-150  flex flex-col justify-between items-center  '>
                    <div className='py-10 px-2 flex flex-col gap-8'>
                    <FontAwesomeIcon icon={faHouse} className='text-gray-400 text-xl p-1 hover:text-violet-700' onClick={()=>{}}/>
                    <FontAwesomeIcon icon={faFolder} className='text-gray-400 text-xl p-1 hover:text-violet-700'/>
                    <FontAwesomeIcon icon={faList} className='text-gray-400 text-xl p-1 hover:text-violet-700'/>
                    </div>
                    <div className='py-10 px-2 flex flex-col gap-8'>
                    <FontAwesomeIcon icon={faGear} className='text-gray-400 text-xl'/>
                    <FontAwesomeIcon icon={faArrowRightFromBracket} className='text-gray-400 text-xl'/>
                    </div>
                </div>
                <DocumentModule/>
            </div>
        </div>
    )
 }

