// src/pages/HomePage.tsx
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/SideBar";
import GridFolders from "../components/GirdFolders";
import { fetchFolders } from "../config/api";
import { api } from "@/config/api";
import { toast } from "sonner";

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
import { Skeleton } from "@/components/ui/skeleton";

interface Folder {
  _id: string;
  totalItems: number;
  name: string;
}

interface User {
  _id: string;
  username: string;
  email: string;
}

const HomePage: React.FC = () => {
  const [folders, setFolders] = useState<Folder[]>([]);
  const [users, setUsers] = useState<User[]>([]);

  /* folder dialogs */
  const [openCreate, setOpenCreate] = useState(false);
  const [folderName, setFolderName] = useState("");
  const [loadingCreate, setLoadingCreate] = useState(false);

  /* users dialog */
  const [openUsers, setOpenUsers] = useState(false);
  const [loadingUsers, setLoadingUsers] = useState(false);

  const isAdmin = !!localStorage.getItem("adminToken");

  const loadFolders = () =>
    fetchFolders()
      .then(setFolders)
      .catch(() => toast.error("Failed to load folders"));

  const loadUsers = () => {
    if (!isAdmin) return;
    setLoadingUsers(true);
    api
      .get("/admin/getAllUsers")
      .then((res) => setUsers(res.data.users || []))
      .catch(() => toast.error("Could not load users"))
      .finally(() => setLoadingUsers(false));
  };

  useEffect(() => {
    loadFolders();
  }, []);

  /* ---------- create folder ---------- */
  const handleCreateFolder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!folderName.trim()) return toast.error("Folder name required");
    setLoadingCreate(true);
    try {
      await api.post("/folder", { name: folderName });
      toast.success("Folder created!");
      setOpenCreate(false);
      setFolderName("");
      loadFolders();
    } catch (err: any) {
      toast.error(err.response?.data?.error || "Failed");
    } finally {
      setLoadingCreate(false);
    }
  };

  /* ---------- delete user ---------- */
  const handleDeleteUser = async (id: string) => {
    await toast.promise(
      api.delete(`/admin/removeUser/${id}`),
      { loading: "Deleting…", success: "User deleted", error: "Delete failed" }
    );
    loadUsers();
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

            <div className="flex gap-3">
              <Button onClick={() => setOpenCreate(true)}>
                + Create Folder
              </Button>

              {isAdmin && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setOpenUsers(true);
                    loadUsers();
                  }}
                >
                  Users
                </Button>
              )}
            </div>
          </div>

          <GridFolders folders={folders} onRefresh={loadFolders} />

          {/* Create-Folder Dialog */}
          <Dialog open={openCreate} onOpenChange={setOpenCreate}>
            <DialogContent className="max-w-sm">
              <DialogHeader>
                <DialogTitle>Create New Folder</DialogTitle>
              </DialogHeader>
              <Card>
                <CardContent className="pt-6">
                  <form onSubmit={handleCreateFolder} className="space-y-4">
                    <div>
                      <Label className="mb-3">Folder name</Label>
                      <Input
                        value={folderName}
                        onChange={(e) => setFolderName(e.target.value)}
                        placeholder="e.g. Marketing Assets"
                        required
                      />
                    </div>
                    <Button
                      type="submit"
                      className="w-full"
                      disabled={loadingCreate}
                    >
                      {loadingCreate ? "Creating…" : "Create"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </DialogContent>
          </Dialog>

          {/* Users Dialog (Admin only) */}
          {isAdmin && (
            <Dialog open={openUsers} onOpenChange={setOpenUsers}>
              <DialogContent className="max-w-lg">
                <DialogHeader>
                  <DialogTitle>Users</DialogTitle>
                </DialogHeader>

                {loadingUsers ? (
                  <Skeleton className="h-10 w-full" />
                ) : (
                  <div className="space-y-3 max-h-[60vh] overflow-y-auto pr-2">
                    {users?.length ? (
                      users.map((user) => (
                        <Card key={user._id} className="flex items-center p-3">
                          <div className="flex-1">
                            <p className="font-semibold">{user.username}</p>
                            <p className="text-sm text-muted-foreground">
                              {user.email}
                            </p>
                          </div>
                          <Button
                            size="sm"
                            variant="destructive"
                            onClick={() => handleDeleteUser(user._id)}
                          >
                            Delete
                          </Button>
                        </Card>
                      ))
                    ) : (
                      <p className="text-sm text-muted-foreground">
                        No users found.
                      </p>
                    )}
                  </div>
                )}
              </DialogContent>
            </Dialog>
          )}
        </main>
      </div>
    </div>
  );
};

export default HomePage;

