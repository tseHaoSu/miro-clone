"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import Overlay from "./Overlay";
import { useAuth } from "@clerk/nextjs";
import { formatDistanceToNow } from "date-fns";
import Footer from "./Footer";
import { Skeleton } from "@/components/ui/skeleton";
import Action from "@/components/Action";
import { MoreHorizontal } from "lucide-react";

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
  return (
    <Link href={`/board/${id}`}>
      <div className="group aspect-[100/127] border rounded-lg flex flex-col justify-between overflow-hidden">
        <div className="relative flex-1 bg-amber-100">
          <Image src={imageUrl} alt={title} fill className="object-fit" />
          <Overlay />
          <Action id={id} title={title} side="bottom">
            <button className="absolute top-1 right-1 p-2 opacity-75 hover:opacity-100 ">
              <MoreHorizontal className="text-white opacity-75 hover:opacity-100 transition-opacity"/>
            </button>
          </Action>
        </div>
        <Footer
          isFavorite={isFavorite}
          title={title}
          authorLabel={authorLabel}
          createdAtLabel={createdAtLabel}
          onClick={() => {}}
          disabled={false}
        />
      </div>
    </Link>
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
