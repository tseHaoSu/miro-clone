"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import React from "react";
import Circle from "./Circle";
import Rectangle from "./Rectangle";
import Text from "./Text";
import Note from "./note";
import Pencil from "./Pencil";
import { colorToCss } from "@/lib/utils";
//memo: prevent rerender

interface Props {
  id: string;
  onLayerPointerDown: (e: React.PointerEvent, layerId: string) => void;
  selectionColor?: string;
}

const LayerPreview = ({ id, onLayerPointerDown, selectionColor }: Props) => {
  const layer = useStorage((root) => root.layers.get(id));

  if (!layer) {
    return null;
  }
  switch (layer.type) {
    case LayerType.Ellipse:
      return (
        <Circle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Rectangle:
      return (
        <Rectangle
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Text:
      return (
        <Text
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Note:
      return (
        <Note
          id={id}
          layer={layer}
          onPointerDown={onLayerPointerDown}
          selectionColor={selectionColor}
        />
      );
    case LayerType.Pencil:
      return (
        <Pencil
          key={id}
          points={layer.points}
          onPointerDown={(e) => onLayerPointerDown(e, id)}
          x={layer.x}
          y={layer.y}
          fill={layer.fill ? colorToCss(layer.fill) : "000"}
          stroke={selectionColor}
        />
      );
    default:
      console.warn("unknown layer");
      return null;
  }
};

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
