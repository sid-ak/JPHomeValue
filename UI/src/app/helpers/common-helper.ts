export class CommonHelper {
    
    /**
     * Zips multiple arrays.
     * @param arr 
     * @returns 
     */
    public static readonly zip = (...arr: any[]) => Array.from(
        { length: Math.max(...arr.map(a => a.length)) }, (_, i) => arr.map(a => a[i]));
}