import { HiOutlineMailOpen } from "react-icons/hi";
import { FaPhoneVolume,FaRegHandshake } from "react-icons/fa6";
import { FaLocationArrow } from "react-icons/fa";
import { FcInvite } from "react-icons/fc";
import {useState} from "react"
import { motion } from "framer-motion";
import Loader from "./Loader"

const Connect = () =>{

  const [name,setName] = useState("");
  const [email,setEmail] = useState("");
  const [subject,setSubject] = useState("");
  const [description,setDescription] = useState("");
  const [res,setRes] = useState("");
  const [loader,setLoader] = useState(false);

  const [backendError,setBackendError] = useState({});

  const connectDetails = async(e) =>{
    e.preventDefault();
    setLoader(true);

    const data = {name,email,subject,description};

    const response = await fetch("http://localhost:3000/connecter",{
      method:'POST',
      headers:{'Content-Type':'application/json'},
      body:JSON.stringify(data)
    })
    const status = await response.json();
    setLoader(false);
    if(status.serverError){
      setRes(status.message);
    }
    else if(response.ok && status.success){
      setName("");
      setEmail("");
      setSubject("");
      setDescription("");
      setBackendError("");
      setRes(status.message);
    }else{
      setBackendError(status.message);
    }

  }

  return(
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
      viewport={{ once: false }}>
      <div className="w-full h-220 flex flex-col justify-center items-center mt-40">
        <p className="w-fit h-fit text-center text-5xl bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">Let's Collaborate</p>
        <hr className="bg-gradient-to-r from-purple-500 to-blue-500 m-10 ml-25 mr-25 h-1"></hr>
        <div className="w-full h-full flex">
          <div className="flex w-[50%] h-full flex-col px-24" >
            <p className="w-full h-fit text-xl py-4"> Let's get in touch </p>
            <p className="text-gray-400 mb-10" >I'm always eager to connect with fellow developers, innovators, and creators to exchange ideas, collaborate on exciting projects, and turn extraordinary concepts into reality.</p>
            <div className="group w-120 h-fit flex border border-gray-700 border-l-4 border-l-blue-500  mt-10  pr-2 py-2 transition-all duration-200 rounded-lg hover:translate-x-1.5" >
              <div className="px-4 py-1 flex justify-center items-center" ><HiOutlineMailOpen className="text-purple-600 mr-2 " size={30} /></div>
              <div>
                <p className="w-full h-fit" >Email</p>
                <p className="w-full h-fit text-gray-400" >hamsaraj531@gmail.com</p>
              </div>
            </div>
            <div className="w-120 h-fit flex border border-gray-700 border-l-4 border-l-blue-500  mt-10  px-1 py-2 transition-all duration-200 rounded-lg hover:translate-x-1.5" >
              <div className="px-4 py-1 flex justify-center items-center" ><FaPhoneVolume className="text-purple-600 mr-2" size={30} /></div>
              <div>
                <p className="w-full h-fit" >Phone</p>
                <p className="w-full h-fit text-gray-400" >8073365276</p>
              </div>
            </div>
            <div className="w-120 h-fit flex border border-gray-700 border-l-4 border-l-blue-500  mt-10  px-1 py-2 transition-all duration-200 rounded-lg hover:translate-x-1.5" >
              <div className="px-4 py-1 flex justify-center items-center" ><FaLocationArrow className="text-purple-600 mr-2" size={30} /></div>
              <div>
                <p className="w-full h-fit" >Location</p>
                <p className="w-full h-fit text-gray-400" >Dayananda Sagar College of Engineering Shavige Malleshwara Hills, 91st Main Rd 1st Stage, Kumaraswamy Layout Bengaluru, Karnataka 560078</p>
              </div>
            </div>
          </div>
          <div className="flex w-[50%] h-full flex-col px-24" >
            <p className="w-full h-fit text-xl py-4"> Reach Out </p>
            <p className="text-gray-400 mb-10" >Together, Let's Build Something Remarkable.</p>

            <form className="flex flex-col gap-8" onSubmit={connectDetails}>
              <div className="flex flex-col justify-items-start">
                <label htmlFor="name" className="m-1"> Your Name </label>
                <input value={name} onChange={(e)=>setName(e.target.value)} type="text" id="name" placeholder="eg:Ram" className="border-2 border-gray-700 px-4 py-2 rounded-xl"></input>
                {backendError.name && <p className="text-red-500" >{backendError.name}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="m-1">Your Email</label>
                <input value={email} onChange={(e)=>setEmail(e.target.value)} type="email" id="email" placeholder="eg:ram123@gmail.com" className="border-2 border-gray-700 px-4 py-2 rounded-xl"></input>
                {backendError.email && <p className="text-red-500">{backendError.email}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="subject" className="m-1">Subject</label>
                <input value={subject} onChange={(e)=>setSubject(e.target.value)} type="text" id="subject" placeholder="eg:Collaboration Opportunity" className="border-2 border-gray-700 px-4 py-2 rounded-xl" ></input>
                {backendError.subject && <p className="text-red-500">{backendError.subject}</p>}
              </div>
              <div className="flex flex-col">
                <label htmlFor="description" className="m-1">Description</label>
                <textarea value={description} onChange={(e)=>setDescription(e.target.value)} type="text" id="description" placeholder="eg: Discussion " className="border-2 border-gray-700 px-4 py-2 rounded-xl max-h-30 min-h-20" ></textarea>
                {backendError.description && <p className="text-red-500" >{backendError.description}</p>}
              </div>
              <button className="w-full h-fit py-2 px-4 bg-gradient-to-r from-pink-400 to-purple-400  rounded-2xl font-mono text-3xl text-bold flex justify-center items-center transition-all duration-500 hover:scale-110" >{loader && <Loader className="mr-20" />}<FcInvite className="text-blue-500 mr-4" size={30}/>Invite</button>
            </form>
          </div>
        </div>
        {res.length!=0 && <div className="text-lg text-green-400 text-center flex flex-col justify-center items-center m-10"><FaRegHandshake size={50} className="text-green-400 animate-pulse mr-4"/><p>{res}</p></div>}
      </div>
    </motion.div>
  )
}

export default Connect;