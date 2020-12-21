/*
 * 
 *        :::::::::  
 *       :+:    :+:  
 *      +:+    +:+  
 *     +#+    +:+   
 *    +#+    +#+    
 *   #+#    #+#     
 *  #########   enniskoe
 * 
 *  exist.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */

export namespace FileSystem {
    async function fileExist(filePath:string): Promise<boolean> {
        try {
            await Deno.stat(filePath);
        } catch(e) {
            return false;
        }
        return true;
    }
    function fileExistSync(filePath:string): boolean {
        try {
            Deno.statSync(filePath);
        } catch(e) {
            return false;
        }
        return true;
    }
}