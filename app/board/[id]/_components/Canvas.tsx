"use client";

import Participants from "./Participants";
import ToolBar from "./Toolbar";
// import { useSelf } from "@liveblocks/react/suspense";
import Info from "./Info";

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  // const (name) = useSelf();
  return (
    <main className="h-screen w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <ToolBar />
    </main>
  );
};

export default Canvas;
