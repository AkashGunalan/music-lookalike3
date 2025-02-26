import express from 'express';
import mongoose from 'mongoose';
import authRouter from './Routers/authRoute';
import cors from 'cors';
import testRouter from './Routers/testRouter';
import apiRouter from './Routers/apiRouter'
import session from 'express-session';

const app = express();

mongoose.connect(process.env.DB_URL || '')
.then(() => {
    console.log('Connection to DB..');
})
.catch((err) => {
    console.log(err);
})

const corsOptions = {
    origin: ['http://localhost:5173'],
    credentials: true
}

app.use(cors(corsOptions));

app.use(express.json());

declare module 'express-session' {
    interface Session{
        user: { email: string, logged: boolean } ,
    }
}

app.use(session({
    secret: process.env.SESSION_SECRET || 'default',
    resave: false,
    saveUninitialized: true,
    cookie: {
        maxAge: 1000 * 600,
        secure: false,
        httpOnly: true
    }
}))

app.use('/server/auth' , authRouter);
app.use('/server/test', testRouter);
app.use('/server/api', apiRouter); 

app.listen(5000, () => {
    console.log('Server is listening on http://localhost:3000');
})
