import { NextRequest, NextResponse } from "next/server";
import dbConnect from "@/lib/mongoose";
import Media from "@/model/Media";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { public_id, url, type } = body; // <-- url, not secure_url

    if (!public_id || !url || !type) {
      // <-- check url
      return NextResponse.json(
        { success: false, message: "Missing required fields" },
        { status: 400 },
      );
    }

    await dbConnect();

    const media = await Media.create({ public_id, url, type });

    return NextResponse.json({ success: true, media });
  } catch (err: any) {
    console.error(err);
    return NextResponse.json(
      { success: false, message: err.message },
      { status: 500 },
    );
  }
}
