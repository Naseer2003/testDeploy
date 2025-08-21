// src/components/GridFolders.tsx
import { useNavigate } from "react-router-dom";
import { FiFolder } from "react-icons/fi";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";

interface Folder {
  _id: string;
  name: string;
  totalItems: number;
}

const GridFolders: React.FC<{ folders: Folder[]; loading?: boolean }> = ({
  folders,
  loading,
}) => {
  const navigate = useNavigate();

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
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-4 gap-6">
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

          <CardFooter>
            <Button
              size="sm"
              className="w-full opacity-0 group-hover:opacity-100 transition-opacity"
            >
              Open
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  );
};

export default GridFolders;