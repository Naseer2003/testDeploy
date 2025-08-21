// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import GridFolders from "../components/GirdFolders";
import { fetchFolders } from "../config/api";
import { api } from "@/config/api";
import {toast} from "sonner";

// shadcn/ui
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface Folder {
  _id: string;
  totalItems: number;
  name: string;
}

const HomePage: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [open, setOpen] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const loadFolders = () =>
    fetchFolders().then(setFolders).catch(console.error);

  useEffect(() => {
    loadFolders();
  }, []);

  const handleCreate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return toast.error("Folder name required");
    setLoading(true);
    try {
      await api.post("/folder", { name: folderName });
      toast.success("Folder created!");
      setOpen(false);
      setFolderName("");
      loadFolders();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-black transition-colors">
      <Navbar />

      <div className="flex pt-14">
        <Sidebar onShowAll={loadFolders} />

        <main className="ml-64 flex-1 p-6 overflow-y-auto">
          {/* header */}
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
              Folders
            </h1>
            <Button onClick={() => setOpen(true)}>+ Create Folder</Button>
          </div>

          <GridFolders folders={folders} />

          {/* Create-Folder Dialog */}
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
              </DialogHeader>
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleCreate} className="space-y-4">
                    <div>
                      <Label className="mb-5">Folder name</Label>
                      <Input
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="e.g. Marketing Assets"
                        required
                      />
                    </div>
                    <Button type="submit" className="w-full" disabled={loading}>
                      {loading ? "Creating…" : "Create"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </DialogContent>
          </Dialog>
        </main>
      </div>
    </div>
  );
};

export default HomePage;