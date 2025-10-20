"use client";

import { memo } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";

interface FontSizePickerProps {
  value: number;
  previousSize: number | null;
  nextSize: number | null;
}

export const FontSizePicker = memo(
  ({ value, previousSize, nextSize }: FontSizePickerProps) => {
    return (
      <div className="flex flex-col items-center px-1">
        {/* Up arrow */}
        <ChevronUp className="w-3.5 h-3.5 text-gray-400" />

        {/* Previous size (scroll up to get this) */}
        <div className="h-3 flex items-center">
          {previousSize !== null && (
            <span className="text-[10px] text-gray-400 leading-none">
              {previousSize}
            </span>
          )}
        </div>

        {/* Current size */}
        <span className="text-sm font-bold text-gray-800 leading-none my-0.5">
          {value}
        </span>

        {/* Next size (scroll down to get this) */}
        <div className="h-3 flex items-center">
          {nextSize !== null && (
            <span className="text-[10px] text-gray-400 leading-none">
              {nextSize}
            </span>
          )}
        </div>

        {/* Down arrow */}
        <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
      </div>
    );
  }
);

FontSizePicker.displayName = "FontSizePicker";
