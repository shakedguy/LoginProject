import express from 'express';
const mobileApi = express();
import mobileLoginRoute from './routes/mobileLoginRoute.js';
import usersRoute from './routes/usersRoute.js';

mobileApi.use('/mobile/login', mobileLoginRoute);
mobileApi.use('/mobile/users', usersRoute);

export default mobileApi;
