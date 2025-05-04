import { Loader } from "lucide-react";
import { Participants } from "./Participants";
import Toolbar from "./Toolbar";

const Loading = () => {
  return (
    <div className="h-screen w-full relative bg-neutral-100 touch-none flex items-center justify-center">
      <Loader className="animate-spin text-neutral-500" />
      <Participants.Skeleton />
      <Toolbar.Skeleton />
    </div>
  );
};

export default Loading;
