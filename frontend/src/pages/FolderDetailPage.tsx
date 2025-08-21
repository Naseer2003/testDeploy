import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "../config/api";
import toast from "react-hot-toast";

function FolderDetailPage() {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();

  const [files, setFiles] = useState<any[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);

  // Fetch files from API
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const res = await api.get(`/files/${folderId}`);
      setFiles(res.data);
    } catch (err) {
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  // Upload selected files
  const uploadFiles = async () => {
    if (!newFiles.length) return toast.error("Select files first");
    setUploading(true);
    try {
      for (const file of newFiles) {
        const form = new FormData();
        form.append("file", file);
        form.append("folderId", folderId!);
        await api.post("/files/upload", form);
      }
      toast.success("Files uploaded!");
      setNewFiles([]);
      fetchFiles();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Delete file with optimistic UI
  const deleteFile = async (fileId: string) => {
  if (!confirm("Are you sure you want to delete this file?")) return;
  try {
    await api.delete(`/files/${fileId}`);
    toast.success("File deleted");
    setFiles((prev) => prev.filter((file) => file._id !== fileId)); // remove from UI
  } catch {
    toast.error("Delete failed");
  }
};

  useEffect(() => {
    fetchFiles();
  }, [folderId]);

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-100">
          📁 Folder Files
        </h1>
      </div>

      {/* Upload Section */}
      <div className="flex flex-wrap gap-3 items-center bg-white dark:bg-gray-800 p-4 rounded-xl shadow border border-gray-200 dark:border-gray-700">
        <input
          type="file"
          multiple
          onChange={(e) => setNewFiles(Array.from(e.target.files!))}
          className="block w-full md:w-auto text-sm text-gray-600
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100 cursor-pointer"
        />
        <button
          onClick={uploadFiles}
          disabled={uploading}
          className={`px-5 py-2 rounded-lg font-medium transition-colors ${
            uploading
              ? "bg-blue-300 text-white cursor-not-allowed"
              : "bg-blue-500 hover:bg-blue-600 text-white"
          }`}
        >
          {uploading ? "Uploading..." : "Upload"}
        </button>
        <button
          onClick={() => navigate("/home")}
          className="px-5 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 rounded-lg font-medium transition-colors"
        >
          Cancel
        </button>
      </div>

      {/* Selected Files Preview */}
      {newFiles.length > 0 && (
        <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <h2 className="font-semibold text-blue-700 mb-2">
            Selected files ({newFiles.length}):
          </h2>
          <ul className="list-disc pl-5 text-sm text-gray-700">
            {newFiles.map((f, idx) => (
              <li key={idx}>{f.name}</li>
            ))}
          </ul>
        </div>
      )}

      {/* Files Grid */}
      <div className="mt-8">
        {loading ? (
          <p className="text-gray-500">Loading files...</p>
        ) : files.length === 0 ? (
          <p className="text-gray-500">No files found in this folder.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
            {files.map((file) => (
              <div
                key={file._id}
                className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow border border-gray-200 dark:border-gray-700 flex flex-col items-center gap-3 hover:shadow-lg transition-shadow"
              >
                {/* File Preview */}
                {file.type?.match(/jpg|jpeg|png|gif|webp/i) ? (
                  <img
                    src={file.url}
                    alt={file.name}
                    className="w-full h-32 object-cover rounded-lg"
                  />
                ) : (
                  <div className="w-full h-32 flex items-center justify-center bg-gray-100 dark:bg-gray-700 rounded-lg">
                    📄
                  </div>
                )}

                {/* File Info */}
                <div className="text-center w-full">
                  <a
                    href={file.url}
                    target="_blank"
                    rel="noreferrer"
                    className="block text-sm font-medium text-blue-600 hover:underline truncate"
                  >
                    {file.name}
                  </a>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024).toFixed(1)} KB
                  </p>

                  {/* Delete Button */}
                  <button
                    onClick={() => deleteFile(file._id)}
                    className="mt-2 px-3 py-1 bg-red-500 hover:bg-red-600 text-white text-xs rounded-lg"
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default FolderDetailPage;