"use client";

import { LayerType } from "@/types/canvas";
import { useStorage } from "@liveblocks/react";
import React from "react";
import Circle from "./Circle";
import Rectangle from "./Rectangle";
import Text from "./Text";
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
    default:
      console.warn("unknown layer");
      return null;
  }
};

LayerPreview.displayName = "LayerPreview";

export default LayerPreview;
