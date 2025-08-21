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
  name: string; // <- add this
}

const HomePage: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const navigate = useNavigate();

  const loadFolders = () =>
    fetchFolders().then(setFolders).catch(console.error);

  useEffect(() => {
    loadFolders();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar />

      {/* sidebar is already fixed, so this flex container only needs left offset */}
      <div className="flex pt-14">
        {" "}
        {/* 14 ≈ 56px navbar height */}
        <Sidebar onShowAll={loadFolders} />
        {/* content area offset by sidebar width */}
        <main className="ml-64 flex-1 p-6 overflow-y-auto">
          {/* header row */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Folders
            </h1>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
              onClick={() => navigate("/create")}
            >
              + Create Folder
            </button>
          </div>

          {/* grid */}
          <GridFolders folders={folders} />
        </main>
      </div>
    </div>
  );
};

export default HomePage;
