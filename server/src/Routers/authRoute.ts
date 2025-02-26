import { Router } from "express";
import User from "../Schemas/User";
import bcrypt from 'bcryptjs';
import axios from "axios";

const router = Router();

interface ApiResponse{
    ok: boolean;
    results?: any;
}

router.post('/register', async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const salt = await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(password, salt);
        
        const user = await new User({ email, password: hashedPassword }).save();
        res.status(201).send({ msg: 'User registration successful', data: user, done: true });
    }catch{
        res.status(400).send({ msg: 'Client Error', done: false })
    }
})

router.post('/login', async (req, res) => {
    const { email, password } = req.body;
    
    try{
        const user = await User.findOne({ email });
        if(user && await bcrypt.compare(password, user.password)){
            if(req.session){
                req.session.user = { email: user.email, logged: true }
            }
            
            console.log(req.session)
            console.log(req.sessionID);
            
            res.status(200).send({ msg: 'Login Successful', data: user, done: true });
        }
        else
        res.status(400).send({ msg: 'User doesn\'t Exists', done: false });
}catch(err){
    console.log(err);
    res.status(400).send({ msg: 'Client Error', done: false })
}
})

router.get('/search', async (req, res) => {
    if(!req.session.user){
        res.status(401).send('Unauthorised..');
    }
    
    const { q } = req.query;
    
    try{
        const API_URL = "https://imdb.iamidiotareyoutoo.com/search?q=" + q;
        const movies = (await axios.get(API_URL)).data as ApiResponse;

        if(movies.ok){
            console.log(movies);
            res.send(movies);
        }
        else
            throw new Error();
    }catch(err){
        console.log(err);
        res.status(401).send({ msg: 'Client Error', done: false })
    }
})

router.get('/profile', (req, res) => {
    if(!req.session.user)
        res.status(401).send('Unauthorized');
    else
    res.status(200).send('Profile Page');
})

router.get('/session', (req, res) => {
    const user = req.session.user;

    console.log(user)

    if(user)
        res.status(200).send({ user, logged: true })
    else
        res.status(401).send({ logged: false });
})

router.get('/logout', (req, res) => {
    const user = req.session.user;
    
    if(req.session.user){
        req.session.destroy((err) => {
            res.status(200).send({ user, done: true });
        })
    }else{
        res.status(440).send({ done: false });
    }
})

export default router;
