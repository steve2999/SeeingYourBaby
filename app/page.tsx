"use client";

import { useState } from "react";

export default function Home() {
  const [mode, setMode] = useState("single");
  const [images, setImages] = useState<{ parent1?: string; parent2?: string }>(
    {}
  );

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

        <button className="bg-rose-500 hover:bg-rose-600 text-white font-semibold py-2 px-6 rounded-full">
          Upload Photos
        </button>

        <p className="text-sm text-gray-400 mt-4">Powered by AI 🌞</p>
      </div>
    </main>
  );
}
