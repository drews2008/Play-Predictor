import React, { useState } from "react";

const FileUploadPage: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleSubmit = () => {
    if (file) {
      alert(`File "${file.name}" uploaded!`);
    } else {
      alert("No file selected.");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Upload Play Log File</h1>
      <input type="file" onChange={handleChange} className="mb-4" />
      <br />
      <button
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Upload
      </button>
    </div>
  );
};

export default FileUploadPage;
