import { useState } from "react";
import mediaUpload from "../utils/mediaUpload";

export default function TestPage() {
  const [image, setImage] = useState(null);

  const fileUpload = async () => {
    try {
      const url = await mediaUpload(image);
      console.log("Uploaded image URL:", url);
    } catch (err) {
      console.error("Error uploading file:", err.message);
    }
  };

  return (
    <div className="w-full h-screen bg-gray-200 flex flex-col items-center justify-center gap-4">
      <input
        type="file"
        className="file-input file-input-bordered w-full max-w-xs"
        onChange={(e) => setImage(e.target.files[0])}
      />
      <button
        onClick={fileUpload}
        className="bg-green-500 text-white font-bold py-2 px-4 rounded"
      >
        Upload
      </button>
    </div>
  );
}
