"use client";

import { Participants } from "./Participants";
import ToolBar from "./Toolbar";
import Info from "./Info";
import { useCallback, useState } from "react";
import {
  Camera,
  CanvasMode,
  Color,
  LayerType,
  Point,
  CanvasState,
} from "@/types/canvas";
import {
  useCanRedo,
  useCanUndo,
  useHistory,
  useMutation,
  useStorage,
} from "@liveblocks/react/suspense";
import CursorPresence from "./CursorPresence";
import { pointerEventToCanvasPoint } from "@/lib/utils";
import { nanoid } from "nanoid";
import { LiveObject } from "@liveblocks/client";

const MAX_LAYERS = 100;

interface CanvasProps {
  boardId: string;
}

const Canvas = ({ boardId }: CanvasProps) => {
  const layersIds = useStorage((root) => root.layerIds);
  const [canvasState, setCanvasState] = useState<CanvasState>({
    mode: CanvasMode.None,
  });
  const [camera, setCamera] = useState<Camera>({
    x: 0,
    y: 0,
  });

  const [lastUsedColor, setLastUsedColor] = useState<Color>({
    r: 0,
    g: 0,
    b: 0,
  });

  const history = useHistory();
  const canUndo = useCanUndo();
  const canRedo = useCanRedo();

  //empty array no dependencies
  const insertLayer = useMutation(
    (
      { storage, setMyPresence },
      layerType:
        | LayerType.Ellipse
        | LayerType.Rectangle
        | LayerType.Note
        | LayerType.Text,
      position: Point
    ) => {
      const liveLayers = storage.get("layers");
      if (liveLayers.size >= MAX_LAYERS) {
        return;
      }

      const liveLayerIds = storage.get("layerIds");
      const layerId = nanoid();

      const layer = new LiveObject({
        type: layerType,
        x: position.x,
        y: position.y,
        height: 100,
        width: 100,
        fill: lastUsedColor,
      });

      liveLayerIds.push(layerId);
      liveLayers.set(layerId, layer);

      setMyPresence(
        {
          selection: [layerId],
        },
        { addToHistory: true }
      );
      setCanvasState({
        mode: CanvasMode.None,
      });
    },
    [lastUsedColor] //dependency
  );

  const onWheel = useCallback((e: React.WheelEvent) => {
    // console.log({ x: e.deltaX, y: e.deltaY });
    setCamera((camera) => ({
      x: camera.x - e.deltaX,
      y: camera.y - e.deltaY,
    }));
  }, []);

  const onPointerMove = useMutation(
    ({ setMyPresence }, e: React.PointerEvent) => {
      e.preventDefault();
      const current = pointerEventToCanvasPoint(e, camera);
      // console.log("current", current);
      setMyPresence({
        cursor: current,
      });
    },
    []
  );

  const onPointerLeave = useMutation(({ setMyPresence }) => {
    setMyPresence({
      cursor: null,
    });
  }, []);

  return (
    <main className="h-screen w-full relative bg-neutral-100 touch-none">
      <Info boardId={boardId} />
      <Participants />
      <ToolBar
        canvasState={canvasState}
        setCanvasState={setCanvasState}
        canRedo={canRedo}
        canUndo={canUndo}
        redo={history.redo}
        undo={history.undo}
      />
      <svg
        className="h-[100vh] w-[100vw]"
        onWheel={onWheel}
        onPointerMove={onPointerMove}
        onPointerLeave={onPointerLeave}
      >
        <g style={{ transform: `translate(${camera.x}px, ${camera.y}px)` }}>
          <CursorPresence />
        </g>
      </svg>
    </main>
  );
};

export default Canvas;
