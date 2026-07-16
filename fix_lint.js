const fs = require('fs');

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
    let newContent = content.replace(/as any/g, 'as unknown');
    newContent = newContent.replace(/: any/g, ': unknown');
    
    if (file.includes('spectators.test.ts')) {
        newContent = newContent.replace(
`			if (id !== null) {
				manager.eject(id);
				expect(manager.chain[id]).toBeNull();
			}`,
`			expect(id).not.toBeNull();
			manager.eject(id!);
			expect(manager.chain[id!]).toBeNull();`
        );
    }
    
    if (file.includes('subscribers.test.ts')) {
        newContent = newContent.replace(
`			if (id !== null) {
				manager.eject(id);
				expect(manager.chain[id]).toBeNull();
			}`,
`			expect(id).not.toBeNull();
			manager.eject(id!);
			expect(manager.chain[id!]).toBeNull();`
        );
    }

    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log('Fixed', file);
    }
});
