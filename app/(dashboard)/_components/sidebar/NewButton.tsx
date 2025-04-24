"use client";

import { Plus } from "lucide-react";
import { CreateOrganization } from "@clerk/nextjs";
import { Dialog, DialogTrigger, DialogContent, DialogTitle } from "@/components/ui/dialog";
import Hint from "@/components/Hint";

const NewButton = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <DialogTitle className="aspect-square">
          <Hint label="Create Organization" side="right" align="start" sideOffset={10}>
            <button className="bg-white/25 w-full h-full rounded-full flex items-center justify-center hover:bg-white/40 transition duration-200">
              <Plus className="text-white" />
            </button>
          </Hint>
        </DialogTitle>
      </DialogTrigger>
      <DialogContent className="bg-transparent w-full">
        <CreateOrganization />
      </DialogContent>
    </Dialog>
  );
};

export default NewButton;
