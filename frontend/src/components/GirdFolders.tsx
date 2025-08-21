// src/components/GridFolders.tsx
import { useNavigate } from "react-router-dom";
import { FiFolder } from "react-icons/fi";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/config/api";
import { toast } from "sonner";

interface Folder {
  _id: string;
  name: string;
  totalItems: number;
}

const GridFolders: React.FC<{
  folders: Folder[];
  loading?: boolean;
  onRefresh?: () => void;
}> = ({ folders, loading, onRefresh }) => {
  const navigate = useNavigate();
  const isAdmin = !!localStorage.getItem("adminToken");

  const deleteFolder = async (id: string) => {
    await toast.promise(
      api.delete(`/folder/${id}`),
      { loading: "Deleting…", success: "Folder deleted", error: "Delete failed" }
    );
    onRefresh?.();
  };

  if (loading) {
    return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {Array.from({ length: 8 }).map((_, i) => (
          <Card key={i} className="aspect-square">
            <CardContent className="flex flex-col items-center justify-center h-full space-y-3">
              <Skeleton className="w-12 h-12 rounded-full" />
              <Skeleton className="w-3/4 h-4 rounded" />
              <Skeleton className="w-1/2 h-3 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  if (!folders.length) {
    return (
      <p className="text-center text-muted-foreground">
        No folders yet. Create one!
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {folders.map(({ _id, name, totalItems }) => (
        <Card
          key={_id}
          className="group relative overflow-hidden border-2 border-transparent hover:border-primary hover:shadow-lg transition-all duration-300 cursor-pointer"
          onClick={() => navigate(`/folder/${_id}`)}
        >
          <CardHeader className="pb-2">
            <div className="flex items-center justify-center text-5xl text-primary">
              <FiFolder />
            </div>
          </CardHeader>

          <CardContent className="pt-0 text-center">
            <h3 className="font-semibold text-lg truncate">{name}</h3>
            <p className="text-sm text-muted-foreground">
              {totalItems} item{totalItems !== 1 && "s"}
            </p>
          </CardContent>

          <CardFooter className="flex-col gap-2">
            <Button
              size="sm"
              className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Open
            </Button>

            {isAdmin && (
              <Button
                size="sm"
                variant="destructive"
                className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  deleteFolder(_id);
                }}
              >
                Delete
              </Button>
            )}
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GridFolders;