export async function clearCache(cacheDir: string, maxSize: number): Promise<string> {
    let total = 0;
    for await (const file of Deno.readDir(cacheDir)) {
        total += (await Deno.stat(cacheDir + file.name)).size / 1024 / 1024 / 1024;
    }
    if (total >= maxSize) {
        const start: number = Date.now();
        for await (const file of Deno.readDir(cacheDir)) {
            Deno.remove(cacheDir + file.name);
        }
        return `Crabbo cache has been cleared in ${Date.now() - start}ms!`;
    } else {
        return "Crabbo cache is not full yet " + total / maxSize * 100;
    }
}