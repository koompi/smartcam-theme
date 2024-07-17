"use client";

import React, { useState } from "react";

interface CopyToClipboardProps {
  text: string;
}

const CopyToClipboard: React.FC<CopyToClipboardProps> = ({ text }) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setIsCopied(true);
      setTimeout(() => setIsCopied(false), 2000); // Reset the copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div>
      <button
        onClick={handleCopy}
        className={`px-4 py-2 font-semibold text-white transition-colors duration-300 rounded-md ${
          isCopied ? "bg-green-500" : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {isCopied ? "Copied!" : "Copy"}
      </button>
    </div>
  );
};

export default CopyToClipboard;
