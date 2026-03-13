import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Media from "@/model/Media";

export async function GET(req: NextRequest) {
  try {
    await dbConnect();
    const mediaList = await Media.find({}).sort({ createdAt: -1 });
    return NextResponse.json(mediaList);
  } catch (err: any) {
    console.error(err);
    return NextResponse.json({ message: err.message }, { status: 500 });
  }
}
