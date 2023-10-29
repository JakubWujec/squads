import React, { useState } from 'react';

type ShareLink = {
  linkToShare: string;
}

const ShareLink = ({ linkToShare }: ShareLink) => {
  const [isCopied, setIsCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(linkToShare)
      .then(() => setIsCopied(true))
      .catch((error) => console.error('Copy failed: ', error));
  };

  return (
    <div className="flex items-center space-x-2">
      <input
        type="text"
        value={linkToShare}
        readOnly
        className="w-64 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleCopyToClipboard}
        className="bg-blue-500 text-white px-3 py-2 rounded hover:bg-blue-600"
      >
        Copy
      </button>
      {isCopied && (
        <span className="text-green-500">Copied to clipboard!</span>
      )}
    </div>
  );
};

export default ShareLink;
