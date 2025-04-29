"use client";

import React from "react";
import Info from "./Info";
import Participants from "./Participants";
import ToolBar from "./Toolbar";

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  return (
    <main className="h-screen w-full relative bg-neutral-100 touch-none">
      <Info />
      <Participants />
      <ToolBar />
    </main>
  );
};

export default Canvas;
