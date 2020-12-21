import { FileSystem } from "../../utils/filesystem.ts";

Deno.test({
    name: 'FS FileExist',
    //only: true,
    fn: FE
});
Deno.test({
    name: 'FS FileExistSync',
    //only: true,
    fn: FES
});
Deno.chdir(Deno.cwd() + "\\testing\\filesystem");

async function FE() {
    console.log("\nthis should be false:", await FileSystem.fileExist('ree.txt'));
    console.log("this should be true:", await FileSystem.fileExist('thisexists.txt'));
}

function FES() {
    console.log("\nthis should be false:", FileSystem.fileExistSync('ree.txt'));
    console.log("this should be true:", FileSystem.fileExistSync('thisexists.txt'));
}