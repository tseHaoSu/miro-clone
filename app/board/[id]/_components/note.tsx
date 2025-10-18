"use client";

import { cn, colorToCss, getContrastingColor } from "@/lib/utils";
import { NoteLayer } from "@/types/canvas";
import { useMutation } from "@liveblocks/react";
import { Kalam } from "next/font/google";
import React from "react";
import ContentEditable, { ContentEditableEvent } from "react-contenteditable";

const font = Kalam({
  subsets: ["latin"],
  weight: ["400", "700"],
});

const calculateFont = (width: number, height: number) => {
  const maxFontSize = 96;
  const minFontSize = 12;
  const scaleFactor = 0.15;

  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  const calculatedSize = Math.min(
    fontSizeBasedOnHeight,
    fontSizeBasedOnWidth,
    maxFontSize
  );
  return Math.max(calculatedSize, minFontSize);
};

interface NoteProps {
  id: string;
  layer: NoteLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Text = ({ layer, onPointerDown, selectionColor, id }: NoteProps) => {
  const { x, y, width, height, value, fill } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
        backgroundColor: fill ? colorToCss(fill) : "#000",
      }}
      className="shadow-md drop-shadow-xl"
    >
      <ContentEditable
        html={value || "Sticky Note"}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center outline-none",
          "overflow-hidden break-words hyphens-auto",
          "min-h-0 min-w-0",
          font.className
        )}
        style={{
          fontSize: calculateFont(width, height),
          color: fill ? colorToCss(getContrastingColor(fill)) : "#000",
        }}
      />
    </foreignObject>
  );
};

export default Text;
