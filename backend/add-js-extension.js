import { exec } from 'child_process';
import { resolve, join, dirname } from 'path';
import { readdirSync, lstatSync, readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';

// Chuyển đổi import.meta.url thành __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Sử dụng __dirname để lấy đường dẫn hiện tại
const projectDir = resolve(__dirname);

const isJavaScriptFile = (content) => {
    const jsKeywords = ['import', 'export', 'require', 'module.exports'];
    return jsKeywords.some(keyword => content.includes(keyword));
};

const addJsExtension = (dir) => {
    readdirSync(dir).forEach(file => {
        const fullPath = join(dir, file);
        if (lstatSync(fullPath).isDirectory()) {
            addJsExtension(fullPath);
        } else {
            let content = readFileSync(fullPath, 'utf8');
            if (file.endsWith('.js') || isJavaScriptFile(content)) {
                let content = readFileSync(fullPath, 'utf8');
                content = content.replace(/(import .* from\s+['"])(.*)(['"];?)/g, (match, p1, p2, p3) => {
                    if (!p2.endsWith('.js') && !p2.startsWith('.')) {
                        return match;
                    }
                    return `${p1}${p2}.js${p3}`;
                });
                writeFileSync(fullPath, content, 'utf8');
            }
        }
    });
};

addJsExtension(projectDir);
