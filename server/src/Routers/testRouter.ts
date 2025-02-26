import axios from 'axios';
import { Router } from 'express';
import SpotifyWebApi from 'spotify-web-api-node';
import dotenv from 'dotenv'

const router = Router();

interface queryParams{
    q: string
}

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

router.get('/get-session', (req, res) => {
    res.send(req.session);
    console.log(req.session);
})


router.get('/search', async (req, res) => {
    if(!token){
        token  = await getToken();
        spotifyApi.setAccessToken(token || '')
    }

    let img_url: string[] = []

    const { q } = req.query;

    try{
        const data  = await spotifyApi.searchTracks(q?.toString() || '');
        data.body.tracks?.items.map((track) => {
            img_url.push(track.album.images[0].url);
        })

        console.log(img_url);
        res.status(200).send(img_url);
    }catch(err){
        console.log(err);
    }
})

router.get('/test-get', (req, res) => {
    const { id, name } = req.query;

    console.log({ id, name });
    res.status(200).send({ id, name });
})

export default router;
