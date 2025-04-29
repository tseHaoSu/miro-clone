"use client";

import { ReactNode } from "react";
import {
  LiveblocksProvider,
  RoomProvider,
  ClientSideSuspense,
} from "@liveblocks/react/suspense";

interface Props {
  roomId: string;
  children: ReactNode;
  fallback: NonNullable<ReactNode> | null;
}

export function Room({ children, roomId, fallback }: Props) {
  console.log("Room ID:", roomId);
  return (
    <LiveblocksProvider
      publicApiKey={
        "pk_dev_1dg-DDO-q0sV4FSmzvjQnAiP8W62onIFqkrYB5mGhcIxWvbz27wmNTUrttbNpp6B"
      }
    >
      <RoomProvider id={roomId} initialPresence={{}}>
        <ClientSideSuspense fallback={fallback}>
          {children}
        </ClientSideSuspense>
      </RoomProvider>
    </LiveblocksProvider>
  );
}
