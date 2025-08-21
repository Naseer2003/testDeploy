// src/pages/FolderDetailPage.tsx
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { api } from "@/config/api";
import { toast } from "sonner";

// shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Skeleton } from "@/components/ui/skeleton";

interface FileItem {
  _id: string;
  name: string;
  url: string;
  type: string;
  size: number;
}

const FolderDetailPage = () => {
  const { folderId } = useParams<{ folderId: string }>();
  const navigate = useNavigate();

  const [files, setFiles] = useState<FileItem[]>([]);
  const [newFiles, setNewFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);

  /* ---------- fetch ---------- */
  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data } = await api.get(`/files/${folderId}`);
      setFiles(data);
    } catch {
      toast.error("Failed to load files");
    } finally {
      setLoading(false);
    }
  };

  /* ---------- upload ---------- */
  const uploadFiles = async () => {
    if (!newFiles.length) return toast.error("Select files first");
    setUploading(true);
    try {
      await Promise.all(
        newFiles.map((file) => {
          const form = new FormData();
          form.append("file", file);
          form.append("folderId", folderId!);
          return api.post("/files/upload", form);
        })
      );
      toast.success("Files uploaded!");
      setNewFiles([]);
      fetchFiles();
    } catch {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  /* ---------- delete ---------- */
  const deleteFile = async (fileId: string) => {
    const ok = await toast.promise(
      api.delete(`/files/${fileId}`),
      {
        loading: "Deleting…",
        success: "File deleted",
        error: "Delete failed",
      }
    );
    if (ok) setFiles((prev) => prev.filter((f) => f._id !== fileId));
  };

  useEffect(() => {
    fetchFiles();
  }, [folderId]);

  /* ---------- skeleton ---------- */
  if (loading) {
    return (
      <div className="fixed inset-0 pl-64 pt-14 overflow-auto p-6">
        <Skeleton className="h-8 w-40 mb-6" />
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <Card key={i}>
              <Skeleton className="w-full h-40" />
              <CardHeader>
                <Skeleton className="h-5 w-3/4" />
                <Skeleton className="h-4 w-1/2" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="h-[90vh] w-[90vw] m-[5%]">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold text-foreground">📁 Folder Files</h1>
        <Button variant="outline" onClick={() => navigate("/home")}>
          Back
        </Button>
      </div>

      {/* Upload Section */}
      <Card className="mb-6">
        <CardContent className="pt-6 flex flex-wrap gap-4 items-center">
          <Input
            type="file"
            multiple
            onChange={(e) => setNewFiles(Array.from(e.target.files!))}
            className="w-full md:w-auto"
          />
          <Button onClick={uploadFiles} disabled={uploading}>
            {uploading ? "Uploading…" : "Upload"}
          </Button>
        </CardContent>
      </Card>

      {/* Selected Preview */}
      {newFiles.length > 0 && (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-sm">
              Selected files ({newFiles.length})
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="list-disc list-inside text-sm text-muted-foreground">
              {newFiles.map((f, i) => (
                <li key={i}>{f.name}</li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}

      {/* Files Grid */}
      {!files.length ? (
        <p className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 mb-10">
          No files found in this folder.
        </p>
      ) : (
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
          {files.map((file) => (
            <Card key={file._id} className="group">
              {file.type?.match(/image\/(jpg|jpeg|png|gif|webp)/i) ? (
                <img
                  src={file.url}
                  alt={file.name}
                  className="w-full h-25 object-cover rounded-t-md"
                />
              ) : (
                <div className="w-full h-40 flex items-center justify-center bg-muted rounded-t-md">
                  📄
                </div>
              )}

              <CardHeader>
                <CardTitle className="text-base truncate">
                  {file.name}
                </CardTitle>
                <p className="text-xs text-muted-foreground">
                  {(file.size / 1024).toFixed(1)} KB
                </p>
              </CardHeader>

              <CardFooter className="flex justify-between">
                <Button size="sm" asChild>
                  <a href={file.url} target="_blank" rel="noreferrer">
                    View
                  </a>
                </Button>
                <Button
                  size="sm"
                  variant="destructive"
                  onClick={() => deleteFile(file._id)}
                >
                  Delete
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default FolderDetailPage;