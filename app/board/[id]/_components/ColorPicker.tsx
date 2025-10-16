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
  const handleCustomColorChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const hex = e.target.value;
    // Convert hex to RGB
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    onChange({ r, g, b });
  };

  return (
    <div className="flex flex-wrap gap-2 items-center max-w-[164px] pr-2 mr-2 border-r border-neutral-300">
      <ColorButton onClick={onChange} color={{ r: 243, g: 82, b: 35 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 192, b: 203 }} />
      <ColorButton onClick={onChange} color={{ r: 255, g: 249, b: 177 }} />
      <ColorButton onClick={onChange} color={{ r: 68, g: 202, b: 99 }} />
      <ColorButton onClick={onChange} color={{ r: 39, g: 142, b: 237 }} />
      <ColorButton onClick={onChange} color={{ r: 155, g: 105, b: 245 }} />
      <ColorButton onClick={onChange} color={{ r: 0, g: 0, b: 0 }} />

      {/* Custom */}
      <div className="relative w-8 h-8">
        <input
          type="color"
          onChange={handleCustomColorChange}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          title="Choose custom color"
        />
        <div className="w-8 h-8 rounded-md border border-neutral-300 pointer-events-none bg-gradient-to-br from-red-500 via-yellow-500 via-green-500 via-blue-500 to-purple-500"></div>
      </div>
    </div>
  );
};

const ColorButton = ({ onClick, color }: ColorButtonProps) => {
  return (
    <button
      onClick={() => onClick(color)}
      className="w-8 h-8 hover:opacity-75 transition"
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
