import { useStorage } from "@liveblocks/react";
import React from "react";
import { LayerType } from "@/types/canvas";
import Rectangle from "./Rectangle";

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
    case LayerType.Rectangle:
      return (
        <Rectangle
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
