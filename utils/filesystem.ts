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
 *  filesystem.ts
 * 
 *  This file belongs to Denniskoe
 *  Dit bestand behoort tot Denniskoe
 * 
 */


export async function fileExist(path: string): Promise<boolean> {
    try {
        await Deno.stat(path);
    } catch (e) {
        return false;
    }
    return true;
}


export function fileExistSync(path: string): boolean {
    try {
        Deno.statSync(path);
    } catch (e) {
        return false;
    }
    return true;
}