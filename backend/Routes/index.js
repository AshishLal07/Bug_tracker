import express from 'express';
import { createUser, login } from '../Controller/auth.js';
import { createBug, deleteBug, getBugs } from '../Controller/bugController.js';
import { verifyToken } from '../middleware/auth.js';

const Router = express.Router();

Router.post('/auth/signUP', createUser);
Router.post('/auth/signIn', login);

Router.get('/getBugs/:id', verifyToken, getBugs);
Router.post('/updateBug/:bugId', verifyToken);
Router.post('/createBug/:id', verifyToken, createBug);
Router.get('/deleteBugs/:id/:bugId', verifyToken, deleteBug);

export default Router;
