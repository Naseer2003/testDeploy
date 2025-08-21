// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import GridFolders from "../components/GirdFolders";
import { fetchFolders } from "../config/api";
import { useNavigate } from "react-router-dom";

 interface Folder {
   _id: string;
   totalItems: number;
   name: string;          // <- add this
 }

const HomePage: React.FC = () => {
  
  const [folders, setFolders] = useState<Folder[]>([]);
  const navigate = useNavigate();

  const loadFolders = () =>
    fetchFolders()
      .then(setFolders)
      .catch(console.error);

  useEffect(() => {
    loadFolders();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <Navbar />
      <div className="flex">
        <Sidebar onShowAll={loadFolders} />
        <main className="flex-1 p-6 h-[calc(100vh-56px)] overflow-y-auto">
          {/* header row */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Folders
            </h1>
            <div className="flex gap-3">
              <button className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition" onClick={() => navigate('/create')}>
                + Create Folder
              </button>
            </div>
          </div>

          {/* grid */}
          <GridFolders folders={folders} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;