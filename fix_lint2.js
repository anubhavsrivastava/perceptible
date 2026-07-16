const fs = require('fs');

function replaceInFile(file, replacements) {
    let content = fs.readFileSync(file, 'utf8');
    for (const [search, replace] of replacements) {
        content = content.split(search).join(replace);
    }
    fs.writeFileSync(file, content, 'utf8');
}

replaceInFile('src/subscribers/__tests__/subscribers.test.ts', [
    [`'invalid' as any`, `'invalid' as unknown as Parameters<typeof manager.use>[0]`],
    [`{ element: {} } as any`, `{ element: {} } as unknown as Parameters<typeof consoleSubscriber>[0]`],
    [`(sub as any)()`, `(sub as unknown as () => void)()`],
    [`{ element: { id: 'test-node' } } as any`, `{ element: { id: 'test-node' } } as unknown as Parameters<typeof domSubscriber>[0]`],
    [
`			if (id !== null) {
				manager.eject(id);
				expect(manager.chain[id]).toBeNull();
			}`,
`			expect(id).not.toBeNull();
			manager.eject(id!);
			expect(manager.chain[id!]).toBeNull();`
    ]
]);

replaceInFile('src/spectators/__tests__/spectators.test.ts', [
    [`'not a function' as any`, `'not a function' as unknown as Parameters<typeof manager.use>[0]`],
    [`(ctx: any, curr: any)`, `(ctx: unknown, curr: Record<string, number>)`],
    [`s1 as any`, `s1 as unknown as Parameters<typeof manager.use>[0]`],
    [`s2 as any`, `s2 as unknown as Parameters<typeof manager.use>[0]`],
    [`{} as any`, `{} as unknown as Parameters<typeof manager.run>[0]`],
    [`{ config: { spectators: [] } } as any`, `{ config: { spectators: [] } } as unknown as Parameters<typeof manager.run>[0]`],
    [`{ element } as any`, `{ element } as unknown as Parameters<typeof windowSpectator>[0]`],
    [`null as any`, `null as unknown as Parameters<typeof viewportSpectator>[0]`],
    [
`			if (id !== null) {
				manager.eject(id);
				expect(manager.chain[id]).toBeNull();
			}`,
`			expect(id).not.toBeNull();
			manager.eject(id!);
			expect(manager.chain[id!]).toBeNull();`
    ]
]);
