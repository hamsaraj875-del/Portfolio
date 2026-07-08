const AdminSidebar = ()=>{
  return (
    <>
    <aside className="w-64 min-h-screen bg-[#111827] text-white">
      <div className="p-6 text-2xl font-bold">
        Portfolio Admin
      </div>

      <nav className="flex flex-col">
        <button className="p-4 hover:bg-gray-700 text-left">
          Dashboard
        </button>

        <button className="p-4 hover:bg-gray-700 text-left">
          Projects
        </button>

        <button className="p-4 hover:bg-gray-700 text-left">
          Messages
        </button>

        <button className="p-4 hover:bg-gray-700 text-left">
          Settings
        </button>

        <button className="p-4 hover:bg-red-600 text-left">
          Logout
        </button>
      </nav>
    </aside>
    </>
  )
}

export default AdminSidebar;