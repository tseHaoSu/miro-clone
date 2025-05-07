"user client";
import Hint from "@/components/Hint";
import { Button } from "@/components/ui/button";
import { LucideIcon } from "lucide-react";

interface ToolButtonProps {
  label: string;
  icon: LucideIcon;
  onClick: () => void;
  isActive?: boolean;
  isDisabled?: boolean;
}

import React from "react";

const ToolButton = ({
  label,
  icon: Icon,
  onClick,
  isActive,
  isDisabled,
}: ToolButtonProps) => {
  return (
    <Hint label={label} side="right" sideOffset={10}>
      <Button
        disabled={isDisabled}
        onClick={onClick}
        variant={isActive ? "boardActive" : "board"}
        size="icon"
      >
        {/*fix icon size*/}
        <Icon />
      </Button>
    </Hint>
  );
};

export default ToolButton;
