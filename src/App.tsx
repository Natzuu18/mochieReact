import { useState } from 'react'
import ShihTzuIcon from './assets/components/mochi_icon'
import './App.css'
import { useRegisterUser } from './hooks/useRegisterUser';
import { useLoginUser } from './hooks/useLogin';
import { useNavigate } from 'react-router-dom';


type LoginModalProps = {
  setLoggingIn: React.Dispatch<React.SetStateAction<boolean>>;

};
type SignUpModalProps = {
  setSignUp: React.Dispatch<React.SetStateAction<boolean>>;
}


function SignUpModal(
  {setSignUp,}: SignUpModalProps
){
  
  const { register, loading, error } = useRegisterUser();
  const [email,setEmail] = useState("");
  const [password, setPassword] = useState("");
  const[fullName,setFullName]=useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [org, setOrg] = useState("");

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();

    if(password !== confirmPassword){
      alert("Password Doesnt Match");
      return;
    }

    try{
       await register({
        fullName,
        email,
        password,
        orgName: org,
      });
      
      
  
    }catch(error){
      console.log(error);
    }

  }

  return(
    <div className="h-1/2 w-1/4 bg-white border-gray-950 border-2 rounded-sm absolute flex flex-col items-center justify-start p-2 fon-mono ">
      <h1 className="text-xl font-semibold">Sign Up</h1>
      <label className="self-start ml-22 mt-10">Email</label>
      <input type="email" className="border-gray-950 border-2 rounded-sm" value={email} onChange={(e)=>setEmail(e.target.value)}/>
      <label className="self-start ml-22 ">Full Name</label>
      <input type="text" className="border-gray-950 border-2 rounded-sm" value={fullName} onChange={(e)=>setFullName(e.target.value)}/>
      <label className="self-start ml-22">Password</label>
      <input type="password" id="passID" className="border-gray-950 border-2 rounded-sm" value={password} onChange={(e)=>setPassword(e.target.value)}/>
      <label className="self-start ml-22">Confirm Password</label>
      <input type="password" className={`border-gray-950 border-2 rounded-sm ${!confirmPassword ? "border-gray-950" : password === confirmPassword ? "border-green-500": "border-red-500"}`} value={confirmPassword} onChange={(e)=>setConfirmPassword(e.target.value)}/>

      <label className="self-start ml-22 ">Company / Organization</label>
      <input type="text" className="border-gray-950 border-2 rounded-sm" value={org} onChange={(e)=>setOrg(e.target.value)}/>
      <div className="flex justify-center items-center flex-col">
        <button className="cursor-pointer bg-gray-600 text-white rounded-md mt-5 py-2 px-10 hover:scale-110 " onClick={handleSubmit} disabled={loading}>
          {loading ? 'Loading...' : 'Register'}
        </button>
      <button
        onClick={() => setSignUp(false)}
        className="absolute right-5 top-5"
      >
        <img src="/x.png" className="w-8 h-8 hover:scale-110 cursor-pointer" />
      </button>
      {error && <p className="text-red-500">{error}</p>}
      </div>
    </div>
  );
}

 
function LoginModal({ setLoggingIn }: LoginModalProps) {
 const navigate = useNavigate();
  const {login,loading,error } = useLoginUser();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent)=>{
    e.preventDefault();
    
    try{
      await login({
         email,
         password,
      });

      navigate('/customer/home')

     
    }catch(error){
      console.log(error);
    }
  }

  return (
    <div className="h-1/2 w-1/4 bg-white border-gray-950 border-2 rounded-sm absolute flex flex-col items-center justify-start p-2 font-mono">
      

      <form className="flex flex-col justify-center items-center h-full w-full" method="post" onSubmit={handleSubmit}>
         <h1 className="text-xl font-semibold">Login</h1>
         <label className="self-start ml-22 mt-10">Email</label>
        <input
          type="email"
          className="border-gray-950 border-2 rounded-sm"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="self-start ml-22">Password</label>
        <input
          type="password"
          className="border-gray-950 border-2 rounded-sm"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="cursor-pointer bg-gray-600 text-white rounded-md mt-5 py-2 px-10 hover:scale-110" type='submit'>
        {loading ? 'Loading...' : 'Login'}
        </button>
         
      </form> 
      {error && <p className="text-red-500">{error}</p>}
            <div className="w-full flex items-center justify-center gap-2  m-2">
        <span className="border-b border-gray-950 w-full"></span>
        <h1 className="text-lg font-semibold mt-5">OR</h1>
        <span className="border-b border-gray-950 w-full"></span>
      </div>
      <div className="w-full flex items-center justify-center mt-10 ">
        <h2>
          Login with:
        </h2>
        <img src="/googleLogo.png" alt="Google Logo" className="w-10 h-10 ml-2 hover:scale-110 cursor-pointer"/>
        <img src="/githubLogo.png" alt="GitHub Logo" className="w-10 h-10 ml-2 hover:scale-110 cursor-pointer"/>
      </div>
      <button
        onClick={() => setLoggingIn(false)}
        className="absolute right-5 top-5"
      >
        <img src="/x.png" className="w-8 h-8 hover:scale-110 cursor-pointer" />
      </button>
    </div>
  );
}





export default function Home(){
   const [isLoggingIn, setIsLoggingIn] = useState(false);
   const [isSigningUp, setIsSigningUp] = useState(false);


  return (
    <div className="flex flex-col items-center justify-between min-h-screen w-full bg-white pt-1">
      <header className="flex justify-center items-center rounded-bl-2xl rounded-tr-2xl border-black bg-black p-2 w-1/2">
        <div className="flex items-center justify-start "> 
          <ShihTzuIcon className="w-16 h-16"/>
          <h1 className="text-lg font-mono bg-gradient-to-r from-purple-700 to-purple-200 bg-clip-text text-transparent">
              MochieAI
          </h1>
        </div>
        <div className="flex items-center justify-end w-full gap-5">
          <div className=" hover:scale-110">
            <div className="bg-gray-500 w-18.5 h-10 absolute index--1 rounded-sm ">
            </div>
            <button onClick={()=>setIsSigningUp(!isSigningUp)} className="bg-white p-2 text-sm text-gray-700 rounded-sm font-mono font-semibold index-10 relative cursor-pointer">
              Sign up
            </button>
          </div>
          
          <div className=" hover:scale-110">
            <div className="bg-gray-500 w-14.5 h-10 absolute index--1 rounded-sm ">
            </div>
            <button onClick={()=> setIsLoggingIn(!isLoggingIn)} className="bg-white p-2 text-sm text-gray-700 rounded-sm font-mono font-semibold index-10 relative cursor-pointer">
              Login
            </button>
          </div>
        </div>

      </header>
      <main className=" w-full flex flex-col justify-center items-center mt-5 text-black font-mono">
        <h1 className=" font-bold text-4xl ">
          MochieAI: Learn. Retrieve. Automate.
        </h1>
        <h3 className=" mt-3 text-lg font-light">
          Automating Paperwork Through Intelligent Document Learning and RAG-Powered Knowledge Retrieval
        </h3>
        {isLoggingIn && <LoginModal setLoggingIn = {setIsLoggingIn}/>}
        {isSigningUp && <SignUpModal setSignUp = {setIsSigningUp}/>}

      </main>
      <footer className="bg-gray-950 w-full h-15 justify-between flex  items-center p-2">
        <h1 className="text-white text-xs font-mono text-center">
          copyright © 2026 MochieAI. All rights reserved. 
        </h1>
         <h1 className="text-white text-xs font-mono text-center">
            developed by: Nathaniel Oliver De Guzman
        </h1>
      </footer>

    </div>
  );
}
