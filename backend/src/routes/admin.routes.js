import express from 'express';
import {getAllUsers} from '../controllers/user.controllers.js';
import { signup, login, logout, removeUser } from '../controllers/admin.controllers.js';

const adminRouter = express.Router();

adminRouter.post('/signup', signup);
adminRouter.post('/login', login);
adminRouter.post('/logout', logout);
// adminRouter.get('/getAllUsers', getAllUsers);
adminRouter.get('/getAllUsers', getAllUsers);
adminRouter.delete('/removeUser/:id', removeUser);

export default adminRouter;