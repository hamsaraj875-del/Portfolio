import {FaChartPie,FaFolderOpen,FaEnvelope,FaCog,FaSignOutAlt,} from "react-icons/fa";
import { MdEmojiEvents } from "react-icons/md";

const AdminSidebar = ({tab,setTab}) => {
  const menus = [
    {
      name: "Dashboard",
      icon: <FaChartPie />,
    },
    {
      name: "Projects",
      icon: <FaFolderOpen />,
    },
    {
      name: "Notification",
      icon: <FaEnvelope />,
    },
    {
      name: "Updates",
      icon: <MdEmojiEvents />,
    },
  ];

  return (
    <aside
      className="fixed top-16 left-0 w-20 md:w-24 lg:w-72 h-[calc(100vh-4rem)] bg-[#111827] border-r border-gray-800 flex flex-col justify-between shadow-xl z-40 transition-all duration-300"
    >
      <div>
        <nav className="mt-5 px-3 space-y-2">
          {menus.map((menu) => (
            <button
            onClick={()=>setTab(menu.name)}
              key={menu.name}
              className={`group flex w-full items-center justify-center lg:justify-start gap-4 rounded-xl px-0 lg:px-5 py-4 text-gray-300 transition-all duration-300 hover:bg-gradient-to-r hover:from-purple-600 hover:to-blue-500 hover:text-white
              ${tab===menu.name?'from-purple-600 hover:to-blue-500 hover:text-white':''}`}
            >
              <span className="text-xl">{menu.icon}</span>

              <span className="hidden lg:block font-medium">{menu.name}</span>
            </button>
          ))}
        </nav>
      </div>
    </aside>
  );
};

export default AdminSidebar;
