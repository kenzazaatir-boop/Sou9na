import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const srcDir = path.join(__dirname, 'src');
const transFile = path.join(srcDir, 'locales', 'translations.ts');

function getAllFiles(dirPath, arrayOfFiles) {
  const files = fs.readdirSync(dirPath);
  arrayOfFiles = arrayOfFiles || [];
  files.forEach(function(file) {
    if (fs.statSync(dirPath + "/" + file).isDirectory()) {
      arrayOfFiles = getAllFiles(dirPath + "/" + file, arrayOfFiles);
    } else {
      if(file.endsWith('.ts') || file.endsWith('.tsx')) {
        arrayOfFiles.push(path.join(dirPath, "/", file));
      }
    }
  });
  return arrayOfFiles;
}

const allFiles = getAllFiles(srcDir, []);
const keysUsed = new Set();

allFiles.forEach(file => {
  const content = fs.readFileSync(file, 'utf-8');
  // Regex to match t('key') or t("key") or t(`key`)
  const regex = /\bt\(['"`](.*?)['"`]\)/g;
  let match;
  while ((match = regex.exec(content)) !== null) {
      if(!match[1].includes('$')) {
        keysUsed.add(match[1]);
      }
  }
});

const transContent = fs.readFileSync(transFile, 'utf-8');

const missing = [];
Array.from(keysUsed).forEach(key => {
  // Check if string is somewhere in transContent (dirty but effective)
  const lastPart = key.split('.').pop();
  if(!transContent.includes(`"${lastPart}"`) && !transContent.includes(`'${lastPart}'`) && !transContent.includes(`${lastPart}:`)) {
    missing.push(key);
  }
});

fs.writeFileSync('missing.json', JSON.stringify(missing, null, 2));
