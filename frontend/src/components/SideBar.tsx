import  {  useEffect, useState } from "react";
import { FiLayers } from "react-icons/fi";
import { fetchFolders } from "../config/api";
import { useNavigate } from "react-router-dom";


interface SidebarProps {
  onShowAll: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onShowAll }) => {
  const [folders, setFolders] = useState<{ _id: string; name: string; totalItems: number }[]>([]);
  const [selected, setSelected] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders()
      .then(setFolders)
      .catch(console.error);
  }, []);

  const handleClick = (name: string, callback?: () => void) => {
    setSelected(name);
    if (callback) callback();
  };

  return (
    <aside
      className="
        w-64 h-[calc(100vh-56px)]
        bg-[#2b2b2b] dark:bg-black text-white dark:text-gray-100
        border-r border-t border-gray-400 dark:border-gray-700
        flex flex-col
        overflow-y-auto transition-colors
      "
    >
      {/* Sidebar header */}
      <div className="p-4 border-b border-gray-400 dark:border-gray-700">
        <h2 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
          Folders
        </h2>
      </div>

      <div className="p-4 space-y-3">
        {/* Static “All Folders” */}
        <button
          onClick={() => handleClick("All Folders", onShowAll)}
          className={`
            flex items-center gap-2 w-full px-3 py-4 rounded-md transition
            ${selected === "All Folders"
              ? "bg-red-600 text-white"
              : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
          `}
        >
          <FiLayers size={18} />
          All Folders
        </button>

        {/* Dynamically fetched folders */}
        {folders.map(({ _id, name, totalItems }) => (
          <button
            key={_id}
            onClick={() => navigate(`/folder/${_id}`)}
            className={`
              flex items-center justify-between w-full px-3 py-4 rounded-md transition
              ${selected === _id
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200"}
            `}
          >
            <span>{name}</span>
            <span className="text-xs opacity-70">{totalItems}</span>
          </button>
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;