"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color } from "@/types/canvas";
import { useMutation, useSelf } from "@liveblocks/react";
import { memo } from "react";
import ColorPicker from "./ColorPicker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    const setFill = useMutation(
      ({ storage }, fill: Color) => {
        const liveLayers = storage.get("layers");
        setLastUsedColor(fill);

        selection?.forEach((id) => {
          liveLayers.get(id)?.set("fill", fill);
        });
      },
      [selection, setLastUsedColor]
    );

    const sendToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = liveLayerIds.toArray();

        // Find indices
        if (selection) {
          for (const id of selection) {
            const index = arr.indexOf(id);
            if (index !== -1) {
              indices.push(index);
            }
          }
        }
        // Sort indices in descending order
        indices.sort((a, b) => b - a);
        // Remove selected layers
        for (const index of indices) {
          liveLayerIds.delete(index);
        }

        // Add them to the beginning
        if (selection) {
          for (let i = selection.length - 1; i >= 0; i--) {
            liveLayerIds.insert(selection[i], 0);
          }
        }
      },
      [selection]
    );

    const bringToFront = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = liveLayerIds.toArray();

        // Find indices of selected layers
        if (selection) {
          for (const id of selection) {
            const index = arr.indexOf(id);
            if (index !== -1) {
              indices.push(index);
            }
          }
        }

        // Sort indices in descending order
        indices.sort((a, b) => b - a);

        // Remove selected layers from their current positions
        for (const index of indices) {
          liveLayerIds.delete(index);
        }

        // opposite send to back
        if (selection) {
          for (const id of selection) {
            liveLayerIds.push(id); // push adds to end
          }
        }
      },
      [selection]
    );

    const selectionBounds = useSelectionBounds();

    const deleteLayers = useDeleteLayers();

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x - camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
      >
        <ColorPicker onChange={setFill} />
        <div className="flex flex-col gap-y-0.5">
          <Hint label="Bring to front">
            <Button variant="board" size="icon" onClick={bringToFront}>
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="send to back">
            <Button variant="board" size="icon" onClick={sendToBack}>
              <SendToBack />
            </Button>
          </Hint>
        </div>
        <div className="flex items-center pl-2 ml-2 border-l border-neutral-300">
          <Hint label="Delete">
            <Button variant="board" size="icon" onClick={deleteLayers}>
              <Trash2 />
            </Button>
          </Hint>
        </div>
      </div>
    );
  }
);

SelectionTools.displayName = "SelectionTools";
export default SelectionTools;
