import { useState } from "react";


let DocumentModule = () =>{

    return(
        <div className=" text-white w-full h-full bg-gradient-to-b from-gray-700/20 via-black/10 to-violet-700/10 backdrop-blur-md backdrop-saturate-150 rounded-2xl flex flex-col justify-start items-center p-6">
           <h1 className="self-start text-2xl font-mono relative inline-block pb-1">
                Documents
                <span className="absolute left-0 bottom-0 w-full h-[1px] bg-gradient-to-r from-purple-700 to-purple-200"></span>
            </h1>

        </div>
    )
}

export default DocumentModule;