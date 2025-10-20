"use client";

import { cn, colorToCss } from "@/lib/utils";
import { TextLayer } from "@/types/canvas";
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
  const minFontSize = 12; // Minimum readable font size
  const scaleFactor = 0.15; // Reduced scale factor for better readability

  const fontSizeBasedOnHeight = height * scaleFactor;
  const fontSizeBasedOnWidth = width * scaleFactor;

  const calculatedSize = Math.min(
    fontSizeBasedOnHeight,
    fontSizeBasedOnWidth,
    maxFontSize
  );
  return Math.max(calculatedSize, minFontSize);
};

interface TextProps {
  id: string;
  layer: TextLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Text = ({ layer, onPointerDown, selectionColor, id }: TextProps) => {
  const { x, y, width, height, value, fill, fontSize } = layer;

  const updateValue = useMutation(({ storage }, newValue: string) => {
    const liveLayers = storage.get("layers");

    liveLayers.get(id)?.set("value", newValue);
  }, []);

  const handleContentChange = (e: ContentEditableEvent) => {
    updateValue(e.target.value);
  };

  // Use fontSize if set, otherwise fall back to calculated font size
  const finalFontSize = fontSize || calculateFont(width, height);

  return (
    <foreignObject
      x={x}
      y={y}
      width={width}
      height={height}
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        outline: selectionColor ? `1px solid ${selectionColor}` : "none",
      }}
    >
      <ContentEditable
        html={value || "Text"}
        onChange={handleContentChange}
        className={cn(
          "h-full w-full flex items-center justify-center text-center drop-shadow-md outline-none",
          "overflow-hidden break-words hyphens-auto",
          "min-h-0 min-w-0",
          font.className
        )}
        style={{
          fontSize: finalFontSize,
          color: fill ? colorToCss(fill) : "#000",
          lineHeight: "1.2",
          wordBreak: "break-word",
        }}
      />
    </foreignObject>
  );
};

export default Text;
