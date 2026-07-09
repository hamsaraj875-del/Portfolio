import {useState} from "react";

const AdminProject=()=>{
  const [projectName,setProjectName] = useState("");
  const [projectDescription,setProjectDescription] = useState("");
  const [projectLink,setProjectLink] = useState("");
  const [projectCode,setProjectCode] = useState("");
  const [projectImg,setProjectImg] = useState(null);

  const handleSubmit=(e)=>{
    e.preventDefault();

    const data = {projectName,projectDescription,projectLink,projectCode,projectImg};

    const response = fetch("http://localhost:3000/add",{
      method:"POST",
      headers:{"Content-Type":"application/json"},
      bodoy:JSON.stringfy(data),
      credentials:"include",
    })

  }

  
  return(
    <>
      <div className="min-h-screen bg-[#0f172a] p-8">
        <div className="mx-auto max-w-3xl rounded-2xl bg-[#111827] p-8 shadow-2xl border border-gray-700">

          <h1 className="mb-8 text-center text-3xl font-bold text-white">
            Add New Project
          </h1>

          <form onSubmit={handleSubmit} className="space-y-6">

            <div>
              <label className="mb-2 block text-gray-300">
                Project Name
              </label>

              <input
                type="text"
                name="name"
                value={projectName}
                onChange={()=>setProjectName(e.target.value)}
                placeholder="Enter project name"
                className="w-full rounded-lg border border-gray-700 bg-[#1f2937] p-3 text-white outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-300">
                Description
              </label>

              <textarea
                rows="5"
                name="description"
                value={projectDescription}
                onChange={(e)=>setProjectDescription(e.target.value)}
                placeholder="Write project description..."
                className="w-full rounded-lg border border-gray-700 bg-[#1f2937] p-3 text-white outline-none focus:border-purple-500 resize-none"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-300">
                Live Project Link
              </label>

              <input
                type="url"
                name="liveLink"
                value={projectLink}
                onChange={(e)=>setProjectLink(e.target.value)}
                placeholder="https://..."
                className="w-full rounded-lg border border-gray-700 bg-[#1f2937] p-3 text-white outline-none focus:border-purple-500"
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-300">
                GitHub Repository
              </label>

              <input
                type="url"
                name="githubLink"
                value={projectLink}
                onChange={()=>setProjectCode(e.target.value)}
                placeholder="https://github.com/..."
                className="w-full rounded-lg border border-gray-700 bg-[#1f2937] p-3 text-white outline-none focus:border-purple-500"
                required
              />
            </div>

            <div>
              <label className="mb-2 block text-gray-300">
                Project Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={()=>setProjectImg(e.target.files[0])}
                className="w-full rounded-lg border border-dashed border-gray-600 bg-[#1f2937] p-3 text-gray-300 file:mr-4 file:rounded-md file:border-0 file:bg-purple-600 file:px-4 file:py-2 file:text-white hover:file:bg-purple-700"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-gradient-to-r from-purple-600 to-blue-600 py-3 text-lg font-semibold text-white transition hover:scale-[1.02]"
            >
              Add Project
            </button>

          </form>
        </div>
      </div>
    </>
  )
}

export default AdminProject;