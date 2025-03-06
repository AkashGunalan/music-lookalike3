import express from 'express';
import mongoose from 'mongoose';
import authRouter from './Routers/authRoute';
import testRouter from './Routers/testRouter';
import apiRouter from './Routers/apiRouter'
import session from 'express-session';
import path from 'path';

const app = express();

mongoose.connect(process.env.DB_URL || '')
.then(() => {
    console.log('Connection to DB..');
})
.catch((err) => {
    console.log(err);
})

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
        httpOnly: true,
        sameSite: 'lax'
    }
}))

app.use("/", express.static(path.join(__dirname, "/static")));

app.use('/server/auth' , authRouter);
app.use('/server/test', testRouter);
app.use('/server/api', apiRouter); 

app.listen(3001, () => {
    console.log('Server is listening on http://localhost:3001');
})
