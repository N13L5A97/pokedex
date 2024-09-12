'use client';

import { useSearchParams } from 'next/navigation';

export default function Search() {
    const searchParams = useSearchParams();
    
    function handleSearch() {
        const params = new URLSearchParams(searchParams);
    
        console.log("check");
        
        
      }


    return (
        <input
            type="search"
            id="search"
            placeholder="Search for a Pokemon"
            className="w-full p-2 mb-10 text-black rounded-lg"
            onChange={(e) =>{
                handleSearch(e.target.value);
            }}
        />
    );
}
