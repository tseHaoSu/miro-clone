"use client";

import { api } from "@/convex/_generated/api";
import { useQuery } from "convex/react";

import EmptyBoards from "./EmptyBoards";
import NewBoardButton from "./NewBoardButton";
import BoardCard from "./board-card";

interface BoardListProps {
  orgId: string;
  query: {
    search?: string;
    favorites?: string;
  };
}

const BoardList = ({ orgId, query }: BoardListProps) => {
  const data = useQuery(api.boards.get, { orgId, ...query });

  if (data === undefined) {
    return (
      <div>
        <h2 className="text-3xl">
          {query.favorites ? "Favorite Boards" : "All Boards"}
        </h2>
        <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
          <BoardCard.Skeleton />
        </div>
      </div>
    );
  }

  if (!data?.length && query.search) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">
          Try searching for something else
        </p>
      </div>
    );
  }

  if (!data?.length && query.favorites) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">No favorites</p>
      </div>
    );
  }
  if (!data?.length) {
    return <EmptyBoards />;
  }
  return (
    <div>
      <h2 className="text-3xl">
        {query.favorites ? "Favorite Boards" : "All Boards"}
      </h2>
      <div className="grid grid-cols-1 gap-4 mt-4 sm:grid-cols-2 lg:grid-cols-4">
        <NewBoardButton orgId={orgId} />
        {data?.map((board) => (
          <BoardCard
            key={board._id}
            id={board._id}
            title={board.title}
            imageUrl={board.imageUrl}
            authorName={board.authorName}
            createdAt={board._creationTime}
            orgId={board.orgId}
            isFavorite={board.isFavorite}
          />
        ))}
      </div>
    </div>
  );
};

export default BoardList;
