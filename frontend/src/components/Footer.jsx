import { FcContacts } from "react-icons/fc";
import { MdAttachEmail } from "react-icons/md";
import { motion } from "framer-motion";
import { AiFillGithub } from "react-icons/ai";
import { BsLinkedin } from "react-icons/bs";
import { SiLeetcode } from "react-icons/si";
import { FaHeart } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: false }}
      >
        <hr className="mt-10 text-gray-700 border-t border-gray-800 "></hr>
        <div className="w-full h-80 flex justify-center items-center">
          <div className="w-[60%] h-full flex flex-col justify-center items-center gap-6 px-8">
            <p className="bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent text-3xl font-bold">
              Hamsaraj V.C
            </p>
            <p className="text-center text-gray-400 font-mono">
              I am a passionate Computer Science student who enjoys solving
              programming challenges, and continuously learning new
              technologies. I believe in consistent learning, problem-solving,
              and turning ideas into real-world projects that create value. My
              goal is to grow as a software developer while continuously
              improving my technical and creative skills.
            </p>
            <p className="italic flex justify-center items-center">
              <FaHeart size={20} className="text-red-500 mr-2"/>"Learn. Struggle. Build."<FaHeart size={20} className="text-red-500 ml-2"/>
            </p>
          </div>
          <div className="w-[40%] h-full flex flex-col justify-center items-center">
            <p className="text-xl flex m-8">
              <FcContacts className="mr-4" size={30} />
              Contact
            </p>
            <p className="text-lg flex ">
              <MdAttachEmail className="text-orange-400 mr-4" size={30} />
              Email : hamsaraj531@gmail.com
            </p>
            <div className="flex gap-6 mt-8">
              <a
                href="https://github.com/hamsaraj875-del"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-purple-400 transition hover:scale-110"
              >
                <AiFillGithub size={28} />
              </a>

              <a
                href="https://www.linkedin.com/in/hamsaraj-v-c-32340b373/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-blue-400 transition hover:scale-110"
              >
                <BsLinkedin size={26} />
              </a>

              <a
                href="https://leetcode.com/u/HamsarajVC/"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition hover:scale-110"
              >
                <SiLeetcode size={26} />
              </a>
            </div>
          </div>
        </div>
        <div className="w-full text-center text-gray-500 mb-8 py-4">
          © 2026 Hamsaraj V.C. All Rights Reserved.
        </div>
      </motion.div>
    </>
  );
};

export default Footer;
