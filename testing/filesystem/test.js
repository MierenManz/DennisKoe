import { fileExist, fileExistSync } from "../../utils/filesystem.ts";

Deno.test({
    name: "FS FileExist",
    fn: FE,
});
Deno.test({
    name: "FS FileExistSync",
    fn: FES,
});

Deno.chdir(Deno.cwd() + "\\testing\\filesystem");

async function FE() {
    console.log("\nthis should be false:", await fileExist("ree.txt"));
    console.log("this should be true:", await fileExist("thisexists.txt"));
}

function FES() {
    console.log("\nthis should be false:", fileExistSync("ree.txt"));
    console.log("this should be true:", fileExistSync("thisexists.txt"));
}
