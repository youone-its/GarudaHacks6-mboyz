import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: NextRequest) {
  const userId = req.headers.get("x-user-id");

  if (!userId) {
    return NextResponse.json({
      name: "UserAnonym",
      level: "-",
      country: "-",
      localRank: "-",
      globalRank: "-",
      xp: "-",
    });
  }

  const user = await prisma.user.findUnique({
    where: { id: parseInt(userId) },
    include: {
      game: true,
    },
  });

  if (!user) {
    return NextResponse.json({
      name: "UserAnonym",
      level: "-",
      country: "-",
      localRank: "-",
      globalRank: "-",
      xp: "-",
    });
  }

  return NextResponse.json({
    name: user.name,
    level: user.game?.level ?? "-",
    country: user.country ?? "-",
    localRank: user.game?.localRank ?? "-",
    globalRank: user.game?.globalRank ?? "-",
    xp: user.game?.xpPoints ?? "-",
  });
}
