import React, { useRef, useState, useEffect } from "react";

const ImageUpload = ({ label, onFileChange, defaultFileName = "" }) => {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");

  useEffect(() => {
    if (typeof defaultFileName === "string" && defaultFileName) {
      setFileName(defaultFileName.split("/").pop()); // just filename
      setPreviewUrl(defaultFileName); // show image from URL
    }
  }, [defaultFileName]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url); // show preview of uploaded file
      onFileChange(file);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div className="flex flex-col mb-4">
      <span className="text-xs font-medium uppercase font-urbanist text-rhythm">
        {label}
        <span className="text-sm text-primary">*</span>
      </span>
      <div className="flex items-center mt-2">
        <input
          type="text"
          value={fileName}
          readOnly
          className="flex-1 px-4 py-2 text-sm font-medium placeholder-gray-400 border rounded-md shadow-sm font-urbanist text-rhythm border-rhythm focus:border-border focus:outline-none"
        />
        <button
          type="button"
          onClick={handleButtonClick}
          className="px-4 py-2 ml-2 text-sm text-white rounded-lg bg-primary"
        >
          Upload
        </button>
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          onChange={handleFileChange}
          accept="image/*"
        />
      </div>

      {/* Image Preview */}
      {previewUrl && (
        <div className="mt-3">
          <img
            src={previewUrl}
            alt="Preview"
            className="w-24 h-24 object-contain rounded border shadow"
          />
        </div>
      )}
    </div>
  );
};

export default ImageUpload;
