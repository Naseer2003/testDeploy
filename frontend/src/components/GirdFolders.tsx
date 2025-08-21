import { useNavigate } from "react-router-dom";
import { FiFolder } from "react-icons/fi";
interface Folder {
  _id: string;
  name: string;
  totalItems: number;
}

const GridFolders: React.FC<{ folders: Folder[] }> = ({ folders }) => {
  const navigate = useNavigate();

  if (!folders.length) {
    return <p className="text-gray-500 dark:text-gray-400">No folders yet. Create one!</p>;
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {folders.map(({ _id, name, totalItems }) => (
        <div
          key={_id}
          onClick={() => navigate(`/folder/${_id}`)}
          className="p-4 rounded-xl shadow bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 flex flex-col items-center justify-center space-y-3 hover:shadow-lg transition-shadow cursor-pointer"
        >
          <FiFolder size={40} className="text-blue-500" />
          <span className="font-semibold text-gray-800 dark:text-gray-100">
            {name}
          </span>
          <span className="text-sm text-gray-500 dark:text-gray-400">
            Total Items: {totalItems}
          </span>
        </div>
      ))}
    </div>
  );
};
export default GridFolders;