"use client";

import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState("single");
  const [images, setImages] = useState<{ parent1?: string; parent2?: string }>({});
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState<string | null>(null);

  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: "parent1" | "parent2"
  ) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      setImages((prev) => ({ ...prev, [key]: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    setLoading(true);
    setResponse(null);

    const payload = {
      mode,
      parent1: images.parent1,
      parent2: images.parent2,
    };

    try {
      const res = await fetch("/api/generate-baby", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      setResponse(data.message || "Image sent to backend for generation.");
    } catch (error) {
      setResponse("Failed to send images to backend.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#ffe0d3] flex items-center justify-center p-4">
      <div className="bg-[#fff7f2] rounded-2xl shadow-lg p-8 max-w-lg w-full text-center">
        <h1 className="text-2xl font-bold text-gray-800 mb-2">
          See What Your Future Baby Might Look Like
        </h1>
        <p className="text-gray-600 mb-4">
          Upload one photo of you and your partner together — or two separate
          photos — to generate an image of your potential child.
        </p>

        {/* Static preview */}
        <div className="flex justify-center items-center gap-6 mb-6">
          <div className="flex flex-col items-center">
            <img
              src="https://cdn.jsdelivr.net/gh/stevetools/seeingyourbaby-assets@main/parent-couple.jpg"
              alt="Parent Example"
              className="rounded-full w-24 h-24 object-cover"
            />
            <span className="text-sm mt-1 text-gray-700">Parents Photo</span>
          </div>
          <div className="text-3xl">➡️</div>
          <div className="flex flex-col items-center">
            <img
              src="https://cdn.jsdelivr.net/gh/stevetools/seeingyourbaby-assets@main/baby.jpg"
              alt="Generated Baby"
              className="rounded-full w-24 h-24 object-cover"
            />
            <span className="text-sm mt-1 text-gray-700">Generated Baby</span>
          </div>
        </div>

        {/* Upload mode toggle */}
        <div className="flex justify-center gap-4 mb-4">
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="mode"
              value="single"
              checked={mode === "single"}
              onChange={() => setMode("single")}
            />
            1 Photo
          </label>
          <label className="flex items-center gap-1">
            <input
              type="radio"
              name="mode"
              value="double"
              checked={mode === "double"}
              onChange={() => setMode("double")}
            />
            2 Photos
          </label>
        </div>

        {/* Upload preview and input */}
        <div className="flex justify-center items-center gap-4 mb-6">
          {mode === "single" ? (
            <div className="flex flex-col items-center">
              <input
                type="file"
                accept="image/*"
                onChange={(e) => handleFileChange(e, "parent1")}
              />
              {images.parent1 && (
                <img
                  src={images.parent1}
                  alt="Parents"
                  className="rounded-full w-24 h-24 mt-2 object-cover"
                />
              )}
            </div>
          ) : (
            <>
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "parent1")}
                />
                {images.parent1 && (
                  <img
                    src={images.parent1}
                    alt="Parent 1"
                    className="rounded-full w-24 h-24 mt-2 object-cover"
                  />
                )}
              </div>
              <div className="flex flex-col items-center">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleFileChange(e, "parent2")}
                />
                {images.parent2 && (
                  <img
                    src={images.parent2}
                    alt="Parent 2"
                    className="rounded-full w-24 h-24 mt-2 object-cover"
                  />
                )}
              </div>
            </>
          )}
        </div>

        <button
          onClick={handleUpload}
          disabled={loading}
          className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-6 rounded-full disabled:opacity-50"
        >
          {loading ? "Sending..." : "Upload Photos"}
        </button>

        {response && <p className="mt-4 text-gray-700">{response}</p>}

        <p className="text-sm text-gray-400 mt-4">Powered by AI 🌞</p>
      </div>
    </main>
  );
}
