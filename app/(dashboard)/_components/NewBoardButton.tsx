"use client";

import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/convex/hooks/use_api_mutation";
import { cn } from "@/lib/utils";
import { Plus } from "lucide-react";
import { toast } from "sonner";

interface NewBoardButtonProps {
  orgId: string;
  disabled?: boolean;
}

const NewBoardButton = ({ orgId, disabled }: NewBoardButtonProps) => {
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    mutate({
      title: "Untitled",
      orgId,
    })
      .then(() => {
        toast.success("Board created");
      })
      .catch((error) => {
        toast.error("Error creating board");
        console.error("Error creating board:", error);
      });
  };
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={cn(
        "col-span-1 aspect-[100/127] bg-blue-600 rounded-lg hover:bg-blue-800 flex flex-col items-center justify-center py-6",
        (pending || disabled) &&
          "cursor-not-allowed opacity-75 hover:bg-blue-600"
      )}
    >
      <div />
      <Plus className="h-12 w-12 text-white stroke-1" />
      <p className="text-white text-xs font-light">New Board</p>
    </button>
  );
};

export default NewBoardButton;
