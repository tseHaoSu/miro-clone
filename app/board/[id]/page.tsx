import React from "react";
import Canvas from "./_components/Canvas";
import { Room } from "@/app/Room";
import Loading from "./_components/Loading";

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: Props) => {
  const { id } = await params;
  return (
    <Room roomId={id} fallback={<Loading />}>
      <Canvas boardId={id} />
    </Room>
  );
};

export default page;
