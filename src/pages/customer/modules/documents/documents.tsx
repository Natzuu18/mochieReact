import { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDebian} from "@fortawesome/free-brands-svg-icons";
import { faBookOpen, faBookOpenReader, faFileCirclePlus, faPaperclip, faQrcode, faRectangleList } from "@fortawesome/free-solid-svg-icons";

let DocumentModule = () =>{

    return(
<div className="text-white w-full h-full bg-gradient-to-b from-gray-700/20 via-black/10 to-violet-700/10 backdrop-blur-md backdrop-saturate-150 rounded-2xl flex justify-start items-center p-2 gap-2">
    <div className="w-3/4 h-full bg-gradient-to-b from-black/20 via-gray-600/10 to-green-900/40 backdrop-blur-md backdrop-saturate-150 rounded-xl flex flex-col justify-center items-center gap-2">
        <FontAwesomeIcon icon={faDebian} className='text-green-600 text-9xl'/>
        <h1 className="text-3xl mt-10 font-mono">Your Centralized Knowledge Space</h1>
        <p className="text-xm text-gray-400 font-light">Fast, Secured, and Trained AI based on your Document</p>

        <div className="w-2/3 h-10 mt-4 flex items-center bg-gray-900 border-2 border-green-700 rounded-md overflow-hidden gap-2.5">
        <label className="h-full px-4 flex items-center justify-center bg-green-700 hover:bg-green-700 text-white cursor-pointer transition-colors">
            <FontAwesomeIcon icon={faPaperclip} />
            <input type="file" className="hidden" />
        </label>

        <input
            type="text"
            placeholder="What do you want to do?"
            className="flex-1 h-full bg-transparent px-3 outline-none text-white placeholder-gray-400"
        />
        </div>
    </div>
    <div className="w-1/4 h-full bg-gradient-to-b from-black/20 via-gray-600/10 to-green-900/40 backdrop-blur-md backdrop-saturate-150 rounded-xl flex flex-col justify-start items-center">
        <div className="w-full flex justify-between items-center p-5">
            <div className="flex justify-center items-center text-center text-2xl  font-light ">
                <h1>Library</h1>
            </div>
            <div className="flex justify-center items-center gap-2">
                <button className="bg-gray-400 p-2 rounded-xl text-green-800 hover:bg-gray-800 hover:text-green-600">
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                </button>
                <button className="bg-gray-400 p-2 rounded-xl text-green-800 hover:bg-gray-800 hover:text-green-600">
                    <FontAwesomeIcon icon={faQrcode} />
                </button>
            </div>
            
            
        </div>
        <div></div>
        <div></div>
        <div></div>

    </div>
</div>
    )
}

export default DocumentModule;