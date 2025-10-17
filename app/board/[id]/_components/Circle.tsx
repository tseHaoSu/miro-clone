import { colorToCss } from "@/lib/utils";
import { EllipseLayer } from "@/types/canvas";
import React from "react";

interface Props {
  id: string;
  layer: EllipseLayer;
  onPointerDown: (e: React.PointerEvent, id: string) => void;
  selectionColor?: string;
}

const Circle = ({ id, layer, onPointerDown, selectionColor }: Props) => {
  const { x, y, width, height, fill } = layer;

  return (
    <ellipse
      className="drop-shadow-md"
      onPointerDown={(e) => onPointerDown(e, id)}
      style={{
        transform: `translate(${x + width / 2}px, ${y + height / 2}px)`,
      }}
      cx={0}
      cy={0}
      rx={width / 2}
      ry={height / 2}
      strokeWidth={1}
      fill={fill ? colorToCss(fill) : "#ccc"}
      stroke={selectionColor || "transparent"}
    />
  );
};

export default Circle;
