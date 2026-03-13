"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function UploadImage() {
//   const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (e) => {
    if (e.target.files) setFile(e.target.files[0]);
  };

  const handleUpload = () => {
    // if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    // এখন axios/fetch দিয়ে API call করতে পারো
  };

  return (
    <div className="space-y-4">
      <input type="file" accept="image/*,video/*" onChange={handleFileChange} />
      <Button onClick={handleUpload}>Upload</Button>
      { <p>Selected: {file.name}</p>}
    </div>
  );
}