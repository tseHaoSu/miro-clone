"use client";

import Action from "@/components/Action";
import { Skeleton } from "@/components/ui/skeleton";
import { api } from "@/convex/_generated/api";
import { useApiMutation } from "@/hooks/use_api_mutation";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import { MoreHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { toast } from "sonner";
import Footer from "./Footer";
import Overlay from "./Overlay";

interface BoardCardProps {
  id: string;
  title: string;
  imageUrl: string;
  authorName: string;
  createdAt: number;
  orgId: string;
  isFavorite: boolean;
}

const BoardCard = ({
  id,
  title,
  imageUrl,
  authorName,
  createdAt,
  orgId,
  isFavorite,
}: BoardCardProps) => {
  const { userId } = useAuth();
  const authorLabel = userId === authorName ? "You" : authorName;
  const createdAtLabel = formatDistanceToNow(createdAt, {
    addSuffix: true,
  });

  const { mutate: onFavorite, pending: pendingFavorite } = useApiMutation(
    api.board.favorite
  );

  const { mutate: onUnfavorite, pending: pendingUnfavorite } = useApiMutation(
    api.board.unfavorite
  );

  const toggleFavorite = () => {
    if (isFavorite) {
      onUnfavorite({ id }).catch(() => toast.error("Failed to unfavorite"));
    } else {
      onFavorite({ id, orgId }).catch(() => toast.error("Failed to favorite"));
    }
    console.log("Board ID:", id, "isFavorite:", isFavorite);
  };
  return (
    <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
      <div className="relative flex-1 bg-amber-100">
        <Link href={`/board/${id}`} className="absolute inset-0 z-10">
          <span className="sr-only">View {title}</span>
        </Link>
        <Image src={imageUrl} alt={title} fill className="object-fit" />
        <Overlay />
        <Action id={id} title={title} side="bottom">
          <button className="absolute top-1 right-1 p-2 opacity-75 hover:opacity-100 z-20">
            <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity" />
          </button>
        </Action>
      </div>
      <Footer
        isFavorite={isFavorite}
        title={title}
        authorLabel={authorLabel}
        createdAtLabel={createdAtLabel}
        onClick={toggleFavorite}
        disabled={pendingFavorite || pendingUnfavorite}
      />
    </div>
  );
};

export default BoardCard;

BoardCard.Skeleton = function BoardCardSkeleton() {
  return (
    <div className="group aspect-[100/127] rounded-lg flex flex-col justify-between overflow-hidden">
      <Skeleton className="h-full w-full" />
    </div>
  );
};
