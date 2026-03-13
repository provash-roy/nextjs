"use client";

import { useState, useEffect } from "react";
import { CldUploadWidget, CldImage, CldVideoPlayer } from "next-cloudinary";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import videojs from "video.js";
import "video.js/dist/video-js.css";
import "videojs-http-source-selector";
// Media interface
interface Media {
  _id: string;
  public_id: string;
  url: string;
  type: "image" | "video";
  thumbnail?: string; // optional thumbnail for video
}

export default function HomePage() {
  const [mediaList, setMediaList] = useState<Media[]>([]);

  // Fetch media from DB on page load
  useEffect(() => {
    const fetchMedia = async () => {
      try {
        const res = await axios.get("/api/get-media");
        setMediaList(res.data);
      } catch (err) {
        console.log("Error fetching media:", err);
      }
    };
    fetchMedia();
  }, []);

  // Handle Cloudinary upload response
  const handleUpload = async (result: any) => {
    const info = result.info;
    console.log("Cloudinary Upload Result:", info);

    const public_id = info.public_id;
    const secure_url = info.secure_url;
    const type = info.resource_type as "image" | "video";
    const thumbnail = info.thumbnail_url; // optional

    if (!public_id || !secure_url || !type) {
      console.error("Upload missing required fields!");
      return;
    }

    try {
      await axios.post("/api/upload", {
        public_id,
        url: secure_url,
        type,
        thumbnail,
      });

      // Update local state immediately
      setMediaList((prev) => [
        { _id: public_id, public_id, url: secure_url, type, thumbnail },
        ...prev,
      ]);
    } catch (err) {
      console.error("Error saving to DB:", err);
    }
  };

  return (
    <div className="p-10 space-y-8 bg-zinc-50 dark:bg-black min-h-screen">
      {/* Upload Card */}
      <Card className="p-4">
        <CardHeader>
          <CardTitle>Upload Media</CardTitle>
        </CardHeader>
        <CardContent>
          <CldUploadWidget
            onSuccess={handleUpload}
            uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!}
          >
            {({ open }: { open: () => void }) => (
              <Button onClick={open}>Upload Image/Video</Button>
            )}
          </CldUploadWidget>
        </CardContent>
      </Card>

      {/* Media Gallery */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {mediaList.map((media) => (
          <Card key={media._id}>
            <CardContent>
              {media.type === "image" ? (
                <CldImage
                  src={media.public_id}
                  width={400}
                  height={300}
                  alt={media.public_id}
                  loading="eager" // avoids LCP warning
                />
              ) : (
                <CldVideoPlayer
                  src={media.public_id}
                  width={400}
                  height={300}
                  controls
                  poster={media.thumbnail} // optional video thumbnail
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
