import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const Toolbar = () => {
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <div className="p-2">Pencil</div>
        <div className="p-2">Square</div>
        <div className="p-2">Pen</div>
        <div className="p-2">Circle</div>
      </div>
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <div className="p-2">Undo </div>
        <div className="p-2">Redo</div>
      </div>
    </div>
  );
};

Toolbar.Skeleton = function ToolbarSkeleton() {
  return (
    <div className="absolute left-2 top-1/2 -translate-y-1/2 flex flex-col gap-y-4">
      <div className="bg-white rounded-md p-1.5 flex flex-col items-center shadow-md">
        <Skeleton className="h-full w-full" />
      </div>
    </div>
  );
};

export default Toolbar;
