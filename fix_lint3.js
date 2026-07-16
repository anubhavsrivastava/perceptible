const fs = require('fs');
const glob = require('glob');

function getFiles(dir, files = []) {
    const fileList = fs.readdirSync(dir);
    for (const file of fileList) {
        const name = `${dir}/${file}`;
        if (fs.statSync(name).isDirectory()) {
            getFiles(name, files);
        } else if (name.endsWith('.ts')) {
            files.push(name);
        }
    }
    return files;
}

const files = getFiles('./src');
files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    let newContent = content.replace(/as any/g, 'as unknown as never');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
    }
});
