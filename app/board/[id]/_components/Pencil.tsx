import { getSvgPathFromStroke } from "@/lib/utils";

interface PencilProps {
  x: number;
  y: number;
  points: number[][];
  fill: string;
  onPointerDown?: (e: React.PointerEvent) => void;
  stroke?: string;
}

const Pencil = ({ x, y, points, fill, onPointerDown, stroke }: PencilProps) => {
  return <path className="drop-shadow-md" onPointerDown={onPointerDown}
  d={getSvgPathFromStroke(getStroke())} />;
};

export default Pencil;
