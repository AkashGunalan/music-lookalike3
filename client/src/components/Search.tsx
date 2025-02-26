import axios from "axios";
import { useEffect, useState } from "react";
import Song from './Song'

const Search = () => {
    const [query, setQuery] = useState('');
    const [songs, setSongs] = useState([]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try{
            const res = await axios.get('/server/api/search', { params: { q: query } } );
            setSongs(res.data);
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        console.log(query);
    }, [query])
    
    return (
        <div className="h-screen bg-black overflow-hidden">
           <form className="flex justify-center p-8 bg-red-500" onSubmit={handleSubmit}>
                <input className="rounded-3xl h-8 w-5/6 bg-slate-800 text-slate-500 p-4 md:w-1/2 md:h-8 lg:w-1/2 lg:h-12" value={query || ''} onChange={(e) => setQuery(e.target.value)} type="text" placeholder="What do you want listen?"/>
            </form> 
            <div className="overflow-auto max-h-screen">
                <div className="grid grid-cols-2 gap-8 p-10 bg-green-400 md:bg-blue-400 md:grid-cols-4 auto-rows-fr">
                    {songs.map((song) => (
                        <Song img_url={song} />
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Search;
