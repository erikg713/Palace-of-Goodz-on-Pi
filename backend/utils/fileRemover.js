const fs = require('fs');
const path = require('path');

exports.removeFile = (relativeUrl) => {
  if (!relativeUrl) return;
  const fullPath = path.join(__dirname, '..', relativeUrl);
  fs.unlink(fullPath, (err) => {
    if (err) console.error(`Failed to delete file: ${fullPath}`, err);
  });
};
