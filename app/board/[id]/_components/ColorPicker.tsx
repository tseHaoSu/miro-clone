"use client";

import { colorToCss } from "@/lib/utils";
import { Color } from "@/types/canvas";

interface ColorPickerProps {
  onChange: (color: Color) => void;
}

interface ColorButtonProps {
  onClick: (color: Color) => void;
  color: Color;
}

const ColorPicker = ({ onChange }: ColorPickerProps) => {
  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-300">
      <ColorButton onClick={onChange} color={{ r: 243, g: 82, b: 35 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 192, b: 203 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 249, b: 177 }} />
      <ColorButton onClick={onChange} color={{ r: 68, g: 202, b: 99 }} />
      <ColorButton onClick={onChange} color={{ r: 39, g: 142, b: 237 }} />
      <ColorButton onClick={onChange} color={{ r: 155, g: 105, b: 245 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 0 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 255, b: 255 }} />
    </div>
  );
};

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      onClick={() => onClick(color)}
      className="w-8 h-8  hover:opacity-75 transition"
    >
      <div
        className="h-8 w-8 rounded-md border border-neutral-300"
        style={{
          background: colorToCss(color),
        }}
      ></div>
    </button>
  );
};

export default ColorPicker;
