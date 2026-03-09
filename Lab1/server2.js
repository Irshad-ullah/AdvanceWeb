const fs = require("fs");

fs.copyFile("file1.txt", "file2.txt", (err) => {
  if (err) {
    console.error("Error copying file:", err);
  } else {
    console.log("File copied successfully.");
  }
});
