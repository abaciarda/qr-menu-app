import { put } from "@vercel/blob";
import { NextRequest, NextResponse } from "next/server";

/**
 * POST /api/upload
 *
 * Receives a file from the browser (multipart/form-data) and stores it in
 * Vercel Blob. Returns the permanent CDN URL.
 *
 * The file is streamed directly to Vercel Blob's edge storage — no base64
 * encoding, no intermediate server buffering, minimal latency.
 *
 * Requires BLOB_READ_WRITE_TOKEN in environment variables (set automatically
 * when you connect Vercel Blob to your project in the Vercel dashboard).
 */
export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file = formData.get("file") as File | null;

  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 });
  }

  if (!file.type.startsWith("image/")) {
    return NextResponse.json({ error: "File must be an image" }, { status: 400 });
  }

  if (file.size > 5 * 1024 * 1024) {
    return NextResponse.json({ error: "Image must be under 5 MB" }, { status: 400 });
  }

  try {
    const timestamp = Date.now();
    const randomSuffix = Math.random().toString(36).slice(2, 8);
    const extension = file.name.split(".").pop() ?? "jpg";
    const baseName = file.name.split(".").slice(0, -1).join(".").replace(/[^a-z0-9-_]/gi, "-");
    const filename = `qr-menu/${baseName}-${timestamp}-${randomSuffix}.${extension}`;

    const blob = await put(filename, file, {
      access: "public",
      // Cache at Vercel's CDN edge for 1 year
      cacheControlMaxAge: 31536000,
    });

    return NextResponse.json({ url: blob.url });
  } catch (error) {
    console.error("Vercel Blob upload error:", error);
    return NextResponse.json({ error: "Upload failed" }, { status: 500 });
  }
}
