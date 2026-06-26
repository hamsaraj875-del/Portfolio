import { FcContacts } from "react-icons/fc";
import { MdAttachEmail } from "react-icons/md";
const Footer =()=>{
  return(
    <>
    <hr className="border mt-10"></hr>
    <div className="w-full h-80 flex justify-center items-center" >
      <div className="w-[60%] h-full flex flex-col justify-center items-center gap-6 px-8">
        <p className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-3xl font-bold">Hamsaraj V.C</p>
        <p className="text-center font-mono" >I am a passionate Computer Science student who enjoys solving programming challenges, and continuously learning new technologies. I believe in consistent learning, problem-solving, and turning ideas into real-world projects that create value. My goal is to grow as a software developer while continuously improving my technical and creative skills.</p>
      </div>
      <div className="w-[40%] h-full flex flex-col justify-center items-center">
        <p className="text-xl flex m-8" ><FcContacts className="mr-4" size={30}/>Contact</p>
        <p className="text-lg flex " ><MdAttachEmail className="text-orange-400 mr-4" size={30}/>Email : hamsaraj531@gmail.com</p>
      </div>
    </div>
    </>
  )
}

export default Footer;