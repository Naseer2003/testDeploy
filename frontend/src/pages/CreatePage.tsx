// src/pages/CreatePage.tsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { api } from "../config/api";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";

const CreatePage: React.FC = () => {
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const createFolder = async () => {
    if (!folderName.trim()) return toast.error("Folder name required");
    setLoading(true);

    try {
      // we just hit a simple endpoint that creates the folder record
      await api.post("/folder", { name: folderName });
      toast.success("Folder created!");
      navigate("/home");
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
    <Navbar />
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 p-4">
      <div className="w-full max-w-sm bg-white dark:bg-gray-800 p-8 rounded-lg shadow space-y-6">
        <h1 className="text-xl font-bold text-center text-gray-800 dark:text-gray-100">
          Create Folder
        </h1>

        <input
          type="text"
          placeholder="Folder name"
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          className="w-full px-3 py-2 border rounded-md dark:bg-gray-700 dark:text-gray-200"
        />

        <button
          onClick={createFolder}
          disabled={loading}
          className="w-full py-2 bg-blue-600 text-white rounded-md disabled:opacity-50"
        >
          {loading ? "Creating…" : "Create"}
        </button>

        <button
          onClick={() => navigate(-1)}
          className="w-full py-2 border rounded-md hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          Cancel
        </button>
      </div>
    </div>
    </>
  );
};

export default CreatePage;