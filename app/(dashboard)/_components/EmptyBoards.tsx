"use client";

import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/convex/_generated/hooks/use_api_mutation";
import { useOrganization } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const EmptyBoards = () => {
  const router = useRouter();
  const { organization } = useOrganization();
  const { mutate, pending } = useApiMutation(api.board.create);

  const onClick = () => {
    if (!organization) return;
    mutate({
      orgId: organization.id,
      title: "New Board",
    })
      .then((id) => {
        toast.success("Board created");
        router.push(`/board/${id}`);
      })
      .catch(() => {
        toast.error("Error creating board");
      });
  };
  return (
    <div className="flex flex-col items-center justify-center h-full my-4">
      <p className="text-muted-foreground">No boards</p>
      <Button disabled={pending} onClick={onClick} size="lg">
        Create Board
      </Button>
    </div>
  );
};

export default EmptyBoards;
