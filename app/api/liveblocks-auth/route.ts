import { api } from "@/convex/_generated/api";
import { auth, currentUser } from "@clerk/nextjs/server";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    process.env.LIVEBLOCKS_SECRET_KEY!, 
});

export async function POST(request: Request) {
  //get auth from clerk
  const authorization = await auth();
  const user = await currentUser();

  //check
  if (!user || !authorization) {
    return new Response("Unauthorized", { status: 403 });
  }

  //get the room id from the request body
  //check if the room id is valid
  const { room } = await request.json();
  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "User1",
    picture: user.imageUrl,
  };

  //create live session
  const session = liveblocks.prepareSession(user.id, { userInfo });

  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }

  //set user info and return the session
  const { status, body } = await session.authorize();
  return new Response(body, {
    status,
  });
}
