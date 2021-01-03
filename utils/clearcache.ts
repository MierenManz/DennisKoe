export async function clearCache(cacheDir: string, maxSize: number): Promise<string> {
    let currentSize = 0;
    for await (const file of Deno.readDir(cacheDir)) {
        currentSize += (await Deno.stat(cacheDir + file.name)).size / 1024 / 1024 / 1024;
    }
    if (currentSize >= maxSize) {
        const start: number = Date.now();
        for await (const file of Deno.readDir(cacheDir)) {
            Deno.remove(cacheDir + file.name);
        }
        return `Crabbo cache has been cleared in ${Date.now() - start}ms!`;
    } else {
        return "Crabbo cache is not full yet " + currentSize / maxSize * 100;
    }
}