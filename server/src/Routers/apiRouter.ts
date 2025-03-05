import Router from 'express'
import dotenv from 'dotenv';
import SpotifyWebApi from 'spotify-web-api-node';

dotenv.config();

const router = Router();

var spotifyApi = new SpotifyWebApi({
    clientId: process.env.CLIENT_ID,
    clientSecret: process.env.CLIENT_SECRET,
    redirectUri: 'http://localhost:3000'
})

let token: string | null = null;

const getToken = async () => {
    try{
        const res = await spotifyApi.clientCredentialsGrant();
        return res.body.access_token;
    }catch(err){
        console.log(err);
        return null;
    }
}

router.get('/search', async (req, res) => {
    if(!token){
        token = await getToken();
        spotifyApi.setAccessToken(token || '');
    }

    let img_urls: string[] = []

    const { q } = req.query;

    try{
        if(!q)
            throw new Error('Missing search parameter');
        const data = await spotifyApi.searchTracks(q?.toString() || '');
        data.body.tracks?.items.map((track) => {
            const url = track.album.images[0]?.url;
            if(url)
                img_urls.push(url);
        })

        res.status(200).send(img_urls);
    }catch(err){
        console.log(err);
    }
})

export default router;
