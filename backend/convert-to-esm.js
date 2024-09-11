const fs = require('fs');
const { globSync } = require('glob');
const path = require('path');

// Tìm tất cả các file .js trong dự án, bỏ qua thư mục node_modules
const files = globSync("**/*.js", { ignore:  ["node_modules/**", "convert-require-to-import.js"] });

files.forEach(file => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(`Error reading file ${file}:`, err);
      return;
    }

    // Thay thế require bằng import
    const result = data.replace(/var (\w+) = require\(([^)]+)\);/g, 'import $1 from $2;');

    fs.writeFile(file, result, 'utf8', err => {
      if (err) {
        console.error(`Error writing file ${file}:`, err);
      } else {
        console.log(`Converted ${file}`);
      }
    });
  });
});
