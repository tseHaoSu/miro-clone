// SelectionTools.tsx - UPDATED
"use client";

import { useSelectionBounds } from "@/hooks/use-selection-bounds";
import { Camera, Color, LayerType, TextLayer } from "@/types/canvas";
import { useMutation, useSelf, useStorage } from "@liveblocks/react";
import { LiveObject } from "@liveblocks/client";
import { memo, useCallback } from "react";
import ColorPicker from "./ColorPicker";
import { FontSizePicker } from "./FontSizePicker";
import { useDeleteLayers } from "@/hooks/use-delete-layers";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { BringToFront, SendToBack, Trash2 } from "lucide-react";

interface SelectionToolsProps {
  camera: Camera;
  setLastUsedColor: (color: Color) => void;
}

const FONT_SIZES = [12, 16, 20, 24, 32, 40, 48, 64, 72, 96];

const SelectionTools = memo(
  ({ camera, setLastUsedColor }: SelectionToolsProps) => {
    const selection = useSelf((me) => me.presence.selection);

    // Check if any selected layer is a text layer
    const selectedLayers = useStorage((root) => {
      if (!selection || selection.length === 0) return [];
      return selection.map((id) => root.layers.get(id)).filter(Boolean);
    });

    const hasTextLayer = selectedLayers?.some(
      (layer) => layer?.type === LayerType.Text
    ) || false;

    // Get the font size from the first text layer (if any)
    const textLayer = selectedLayers?.find(
      (layer) => layer?.type === LayerType.Text
    ) as TextLayer | undefined;
    const currentFontSize = textLayer?.fontSize || 24;

    // Calculate previous and next font sizes for visual indicator
    const currentIndex = FONT_SIZES.indexOf(currentFontSize);
    const previousSize = currentIndex > 0 ? FONT_SIZES[currentIndex - 1] : null;
    const nextSize =
      currentIndex < FONT_SIZES.length - 1
        ? FONT_SIZES[currentIndex + 1]
        : null;

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

    const setFontSize = useMutation(
      ({ storage }, fontSize: number) => {
        const liveLayers = storage.get("layers");

        selection?.forEach((id) => {
          const layer = liveLayers.get(id);
          if (layer?.get("type") === LayerType.Text) {
            const textLayer = layer as LiveObject<TextLayer>;
            textLayer.set("fontSize", fontSize);
          }
        });
      },
      [selection]
    );

    const sendToBack = useMutation(
      ({ storage }) => {
        const liveLayerIds = storage.get("layerIds");
        const indices: number[] = [];
        const arr = liveLayerIds.toArray();

        if (selection) {
          for (const id of selection) {
            const index = arr.indexOf(id);
            if (index !== -1) {
              indices.push(index);
            }
          }
        }

        indices.sort((a, b) => b - a);

        for (const index of indices) {
          liveLayerIds.delete(index);
        }

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

        if (selection) {
          for (const id of selection) {
            const index = arr.indexOf(id);
            if (index !== -1) {
              indices.push(index);
            }
          }
        }

        indices.sort((a, b) => b - a);

        for (const index of indices) {
          liveLayerIds.delete(index);
        }

        if (selection) {
          for (const id of selection) {
            liveLayerIds.push(id);
          }
        }
      },
      [selection]
    );

    const selectionBounds = useSelectionBounds();
    const deleteLayers = useDeleteLayers();

    // Handle mouse wheel scroll to change font size
    const handleWheel = useCallback(
      (e: React.WheelEvent) => {
        if (!hasTextLayer) return;

        e.preventDefault();
        e.stopPropagation();

        const currentIndex = FONT_SIZES.indexOf(currentFontSize);
        let newIndex: number;

        if (e.deltaY > 0) {
          // Scroll down - increase font size (go to next)
          newIndex = Math.min(FONT_SIZES.length - 1, currentIndex + 1);
        } else {
          // Scroll up - decrease font size (go to previous)
          newIndex = Math.max(0, currentIndex - 1);
        }

        if (newIndex !== currentIndex && newIndex >= 0) {
          setFontSize(FONT_SIZES[newIndex]);
        }
      },
      [hasTextLayer, currentFontSize, setFontSize]
    );

    if (!selectionBounds) {
      return null;
    }

    const x = selectionBounds.width / 2 + selectionBounds.x + camera.x;
    const y = selectionBounds.y + camera.y;

    return (
      <div
        className="absolute p-3 rounded-xl bg-white shadow-sm border flex select-none z-50"
        style={{
          transform: `translate(calc(${x}px - 50%), calc(${y - 16}px - 100%))`,
        }}
        onWheel={handleWheel}
      >
        <ColorPicker onChange={setFill} />

        {hasTextLayer && (
          <div className="flex items-center pl-2 ml-2 border-l border-neutral-300">
            <Hint label="Scroll to change font size" side="bottom">
              <FontSizePicker
                value={currentFontSize}
                previousSize={previousSize}
                nextSize={nextSize}
              />
            </Hint>
          </div>
        )}

        <div className="flex flex-col gap-y-0.5 pl-2 ml-2 border-l border-neutral-300">
          <Hint label="Bring to front">
            <Button variant="board" size="icon" onClick={bringToFront}>
              <BringToFront />
            </Button>
          </Hint>
          <Hint label="Send to back">
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
