import '../../App.css'
import ShihTzuIcon from '../../assets/components/mochi_icon'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightFromBracket, faFolder, faGear, faHouse, faList, faMicrochip } from '@fortawesome/free-solid-svg-icons';
import { faDochub } from '@fortawesome/free-brands-svg-icons';
import DocumentModule from './modules/documents/documents';
import { useGetCurrentUser } from '../../hooks/useGetCurrentUser';


 export default function CustomerHome(){
 const { user, loading, error } = useGetCurrentUser();

    
    return(
        <div className="w-full flex flex-col justify-start pt-5 items-center h-screen bg-black p-0 ">
            <div className='w-full h-1/16 flex justify-start items-center p-1 '>
                <ShihTzuIcon/> 
                <h1 className="text-lg font-mono font-medium bg-gradient-to-r from-green-600 to-green-400 bg-clip-text text-transparent">
                    MochieAI
                </h1>
                <div className='w-full h-full flex  justify-between border-white px-10'>
                        <h1 className="self-center text-2xl font-light relative inline-block pb-2 text-white">
                        <FontAwesomeIcon icon={faMicrochip} className='text-gray-400 text-xl'/> AI Learning Materials

                        {/* Base black line */}
                        <span className="absolute left-0 bottom-0 w-full h-[2px] bg-black overflow-hidden">
                            {/* Wider animated purple highlight */}
                            <span className="absolute top-0 left-[-60%] h-full w-[60%] bg-gradient-to-r from-transparent via-green-500 to-transparent blur-[1px] animate-flow"></span>
                        </span>
                        </h1>
                    <div className='w-1/4 flex items-center justify-end px-5 h-full gap-2 self-end'>
                        <div className='flex flex-col w-full justify-end items-end text-end text-white font-semi'>
                            <p className='text-md'>
                                 {loading ? "Loading User Details" : user?.full_name || "Token Expired"}   
                            </p>
                            <h1 className='text-xs text-gray-400'>
                                {user?.role}
                            </h1>

                        </div>
                        <img src="/downprof.jpg" alt="meow" className='w-13 rounded-full h-13' />
                    </div>
                </div>
            </div>
            <div className='w-full h-full flex justify-start items-center p-4 m-1 '>
                <div className='rounded-2xl h-full min-w-1/20 bg-gradient-to-b from-gray-700/60 via-black/10 to-violet-700/20 backdrop-blur-md backdrop-saturate-150  flex flex-col justify-between items-center  '>
                    <div className='py-10 px-2 flex flex-col gap-8'>
                    <FontAwesomeIcon icon={faHouse} className='text-gray-400 text-xl p-1 hover:text-violet-700' onClick={()=>{}}/>
                    <FontAwesomeIcon icon={faMicrochip} className='text-gray-400 text-xl p-1 hover:text-violet-700'/>
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

