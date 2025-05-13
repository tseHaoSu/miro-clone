"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { LayerType, Side, XYWH } from "@/types/canvas";
import { useSelf, useStorage } from "@liveblocks/react/suspense";
import React, { memo } from "react";

interface Props {
  onResizeHandlePointerDown: (corner: Side, initialBounds: XYWH) => void;
}

const HANDLE_WIDTH = 8;

export const SelectionBox = memo(({ onResizeHandlePointerDown }: Props) => {
  const soleLayerId = useSelf((me) =>
    me.presence.selection.length === 1 ? me.presence.selection[0] : null
  );

  const isShowingHandles = useStorage((root) => {
    const result =
      soleLayerId !== null &&
      root.layers.get(soleLayerId)?.type !== LayerType.Path;
    // console.log("Should show handles:", result);
    return result;
  });

  //check boundaries
  const bounds = useSelectionBounds();

  if (!bounds) {
    return null;
  }

  return (
    <>
      {/* Selection rectangle */}
      <rect
        className="fill-transparent stroke-blue-500 stroke-1 pointer-events-none"
        style={{
          transform: `translate(${bounds.x}px, ${bounds.y}px)`,
        }}
        x={0}
        y={0}
        width={bounds.width}
        height={bounds.height}
      />

      {/* Handles */}
      {isShowingHandles && (
        <>
          {/* Top-left corner (NW) */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={bounds.x - HANDLE_WIDTH / 2}
            y={bounds.y - HANDLE_WIDTH / 2}
            width={HANDLE_WIDTH}
            height={HANDLE_WIDTH}
            style={{
              cursor: "nwse-resize",
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />

          {/* Top-right corner (NE) */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={bounds.x + bounds.width - HANDLE_WIDTH / 2}
            y={bounds.y - HANDLE_WIDTH / 2}
            width={HANDLE_WIDTH}
            height={HANDLE_WIDTH}
            style={{
              cursor: "nesw-resize",
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />

          {/* Bottom-left corner (SW) */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={bounds.x - HANDLE_WIDTH / 2}
            y={bounds.y + bounds.height - HANDLE_WIDTH / 2}
            width={HANDLE_WIDTH}
            height={HANDLE_WIDTH}
            style={{
              cursor: "nesw-resize",
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />

          {/* Bottom-right corner (SE) */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={bounds.x + bounds.width - HANDLE_WIDTH / 2}
            y={bounds.y + bounds.height - HANDLE_WIDTH / 2}
            width={HANDLE_WIDTH}
            height={HANDLE_WIDTH}
            style={{
              cursor: "nwse-resize",
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />

          {/* Top middle (N) */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}
            y={bounds.y - HANDLE_WIDTH / 2}
            width={HANDLE_WIDTH}
            height={HANDLE_WIDTH}
            style={{
              cursor: "ns-resize",
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />

          {/* Right middle (E) */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={bounds.x + bounds.width - HANDLE_WIDTH / 2}
            y={bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}
            width={HANDLE_WIDTH}
            height={HANDLE_WIDTH}
            style={{
              cursor: "ew-resize",
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />

          {/* Bottom middle (S) */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={bounds.x + bounds.width / 2 - HANDLE_WIDTH / 2}
            y={bounds.y + bounds.height - HANDLE_WIDTH / 2}
            width={HANDLE_WIDTH}
            height={HANDLE_WIDTH}
            style={{
              cursor: "ns-resize",
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />

          {/* Left middle (W) */}
          <rect
            className="fill-white stroke-1 stroke-blue-500"
            x={bounds.x - HANDLE_WIDTH / 2}
            y={bounds.y + bounds.height / 2 - HANDLE_WIDTH / 2}
            width={HANDLE_WIDTH}
            height={HANDLE_WIDTH}
            style={{
              cursor: "ew-resize",
            }}
            onPointerDown={(e) => {
              e.stopPropagation();
            }}
          />
        </>
      )}
    </>
  );
});

SelectionBox.displayName = "SelectionBox";
