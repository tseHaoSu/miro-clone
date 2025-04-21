"use client";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <div className="aspect-square">
          <button className="bg-white/25 w-full h-full rounded-full flex items-center justify-center hover:bg-white/40 transition duration-200">
            <Plus className="text-white" />
          </button>
        </div>
      </DialogTrigger>
      <DialogContent>
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
