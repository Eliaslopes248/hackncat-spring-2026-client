
/**
 * this is a web hook that uses the localStorage to cache data in browser local storage
 * 
 * @returns UseCache hook
 */
const DEFAULT_EXPIRE_TIME:number = 60 * 60 * 1000;

export type cacheItemType = {data: any, expire: number};

export default function useCache()
{
    // add to localstorage
    function setCachedData(
                    key:string,
                    data:any,
                    expire:number=DEFAULT_EXPIRE_TIME):void
    {
        // create a item to be put in local storage
        const item: cacheItemType = {
            data:   data,
            expire: Date.now() + expire
        }
        // add to local storage
        localStorage.setItem(key, JSON.stringify(item));
    }

    function getCachedData(k:string): cacheItemType | null
    {
        // attempt to fetch
        const jsonStr = localStorage.getItem(k);
        // if key is empty or nothing stored, return null
        if (!k || !jsonStr) return null;
        // parse JSON item
        const data: cacheItemType = JSON.parse(jsonStr);
        // check expire time
        if (Date.now() > data.expire){
            localStorage.removeItem(k);
            return null;
        } else {
            return data;
        }

    }



  return { setCachedData, getCachedData };
}
