import { Router } from "express";
import {authRequired} from "../middlewares/validateToken.js";
import {createUser, deleteUser, getUser, getUsers, updateUser} from "../controllers/user.controller.js";

const router = Router();

router.get('/users', authRequired, getUsers);
router.get('/users/:id', authRequired, getUser);
router.post('/users', authRequired, createUser);
router.delete('/users/:id', authRequired, deleteUser);
router.put('/users/:id', authRequired, updateUser);



export default router;  

