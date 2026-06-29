import { useState } from "react";

export const useFileExtractor = (files:File[])=>{
      const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);


      const upload = async () => {
    const formData = new FormData();
    
    files.forEach((file) => {
      formData.append("files", file);
    });



  };

  return { upload };
    
}