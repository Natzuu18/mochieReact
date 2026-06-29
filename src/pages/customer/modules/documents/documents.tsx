import { useRef, useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDebian} from "@fortawesome/free-brands-svg-icons";
import { faCircleCheck, faCircleExclamation, faFileCirclePlus, faPaperclip, faQrcode, faXmark } from "@fortawesome/free-solid-svg-icons";
import api from "../../../../infrastructure/api/axios";


type isAddingFile = {
  setFile: React.Dispatch<React.SetStateAction<boolean>>;
}

let InsertDocumentModal = ({setFile}:isAddingFile) =>{

    const [files, setFiles] = useState<File[]>([]);
    const [dragging, setDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = (incoming: FileList | null) => {
        if (!incoming || incoming.length === 0) return;

        const existingNames = new Set(files.map(f => f.name));
        const duplicates: string[] = [];
        const newFiles: File[] = [];

        Array.from(incoming).forEach(file => {
            if (existingNames.has(file.name)) {
                duplicates.push(file.name);
            } else {
                newFiles.push(file);
            }
        });

        if (duplicates.length > 0) {
            alert(`Already exists: ${duplicates.join(', ')}`);
        }

        if (newFiles.length > 0) {
            setFiles(prev => [...prev, ...newFiles]);
        }
    };

    const openFilePicker = () => {
        fileInputRef.current?.click();
    };

    const handleImport = async () => {
        if (files.length === 0) return;

        const formData = new FormData();
        files.forEach((file) => formData.append('files', file));

        try {
            await api.post('/documents/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
            });
            alert('Files uploaded successfully');
            setFile(false);
        } catch (error) {
            console.error(error);
            alert('Failed to upload files');
        }
    };

    return(
        <>
        <div className="w-100 h-100 bg-white z-10 absolute text-black right-8 top-20 rounded-sm flex flex-col justify-start items-center">
            <div className="flex flex-col justify-start text-start items-start w-full p-2 font-normal">
                <h1 className="text-xl font-bold">Import Document</h1>
                <p className="text-[12px] text-gray-400 font-normal">The document will use for training AI Modal</p>
            </div>
            <div className="flex flex-col mt-5">
                <div
                role="button"
                tabIndex={0}
                onClick={openFilePicker}
                onDragOver={e => { e.preventDefault(); setDragging(true); }}
                onDragLeave={() => setDragging(false)}
                onDrop={e => { e.preventDefault(); setDragging(false); handleFiles(e.dataTransfer.files); }}
                className={`border-2 border-dashed rounded-xl p-10 text-center cursor-pointer transition
                    ${dragging ? 'border-blue-400 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
                >
                <input ref={fileInputRef} type="file" className="hidden" multiple onChange={e => handleFiles(e.target.files)} />

                <p className="text-sm text-normal">Drag & drop your ZIP here or <span className="text-blue-500 underline">browse</span></p>
                </div>

            </div>
            <p className="flex text-gray-400 text-start justify-start text-xs mt-1">
                <FontAwesomeIcon icon={faCircleExclamation} className="text-green-600 text-md self-center" /> Max size of each file should be 20mb only
            </p>
                <ul className="mt-4 h-30 text-left text-sm text-gray-700 overflow-y-scroll scrollbar-hide">
                    {files.map((file, index) => (
                        <li key={index} className="py-1 border-b border-gray-200 last:border-b-0">
                            <FontAwesomeIcon icon={faCircleCheck} className="text-green-600 text-md self-center" />  {file.name} 
                        </li>
                    ))}
                </ul>
            <div className="flex text-sm bottom-3 absolute gap-2 right-4">
                <button className="rounded-md border-2 border-gray-300 p-1 px-4">
                    Cancel
                </button>
                <button className="rounded-md bg-black p-1 px-4 text-white" onClick={handleImport}>
                    Import
                </button>
            </div>
            <button className="absolute top-2 right-2 text-xl" onClick={()=>{setFile(false)}}>
                <FontAwesomeIcon icon={faXmark} className="text-red-600 text-md self-center" />
            </button>
        </div>
        </>
    )
}




let DocumentModule = () =>{
    const [isAddingFile, setAddingFile]= useState(false);

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
    {isAddingFile && <InsertDocumentModal setFile = {setAddingFile}/>}
    <div className="w-1/4 h-full bg-gradient-to-b from-black/20 via-gray-600/10 to-green-900/40 backdrop-blur-md backdrop-saturate-150 rounded-xl flex flex-col justify-start items-center">
        <div className="w-full flex justify-between items-center p-5">
            <div className="flex justify-center items-center text-center text-2xl  font-light ">
                <h1>Library</h1>
            </div>
            <div className="flex justify-center items-center gap-2 relative inset-0 ">
                <button className="bg-gray-300 p-2 rounded-xl text-green-800 hover:bg-gray-800 hover:text-green-600" onClick={()=>{setAddingFile(!isAddingFile)}}>
                    <FontAwesomeIcon icon={faFileCirclePlus} />
                </button>
                
          
                <button className="bg-gray-300 p-2 rounded-xl text-green-800 hover:bg-gray-800 hover:text-green-600">
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