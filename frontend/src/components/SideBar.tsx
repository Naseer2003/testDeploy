// src/components/Sidebar.tsx
import { useEffect, useState } from "react";
import { FiLayers } from "react-icons/fi";
import { fetchFolders } from "../config/api";
import { useNavigate } from "react-router-dom";

interface SidebarProps {
  onShowAll: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ onShowAll }) => {
  const [folders, setFolders] = useState<
    { _id: string; name: string; totalItems: number }[]
  >([]);
  const [selected, setSelected] = useState<string>("");
  const navigate = useNavigate();

  useEffect(() => {
    fetchFolders().then(setFolders).catch(console.error);
  }, []);

  const handleClick = (id: string, callback?: () => void) => {
    setSelected(id);
    if (callback) callback();
  };

  return (
    <aside className="fixed top-[56px] left-0 w-64 h-[calc(100vh-56px)] bg-[#2b2b2b] dark:bg-black text-white dark:text-gray-100 border-r border-gray-400 dark:border-gray-700 flex flex-col z-20">
      {/* Header */}
      <div className="flex-shrink-0 p-4 border-b border-gray-400 dark:border-gray-700">
        <h2 className="text-xl font-semibold">Folders</h2>
      </div>

      {/* Scrollable folder list */}
      <nav className="flex-1 overflow-y-auto p-4 space-y-3">
        {/* All Folders */}
        <button
          onClick={() => handleClick("all", onShowAll)}
          className={`flex items-center gap-2 w-full px-3 py-3 rounded-md transition
            ${
              selected === "all"
                ? "bg-red-600 text-white"
                : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
            }`}
        >
          <FiLayers size={18} />
          All Folders
        </button>

        {/* Dynamic folders */}
        {folders.map(({ _id, name, totalItems }) => (
          <button
            key={_id}
            onClick={() => {
              handleClick(_id);
              navigate(`/folder/${_id}`);
            }}
            className={`flex items-center justify-between w-full px-3 py-3 rounded-md transition
              ${
                selected === _id
                  ? "bg-red-600 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-200 dark:hover:bg-gray-700"
              }`}
          >
            <span className="truncate">{name}</span>
            <span className="text-xs opacity-70">{totalItems}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;