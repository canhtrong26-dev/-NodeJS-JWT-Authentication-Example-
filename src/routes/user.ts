import  { Router }  from 'express';
import { authMiddleware } from '../middlewares/authMiddleware';
import { authorize } from '../middlewares/roleMiddleware';
import { getUsers, createUser, updateUser, deleteUser } from '../controllers/userController';


const router = Router(); 

router.get('/', authMiddleware, authorize(['User', 'Admin']), getUsers);
router.post('/', authMiddleware, authorize(['Admin']), createUser);
router.put('/:id', authMiddleware, authorize(['Admin']), updateUser);
router.delete('/:id', authMiddleware, authorize(['Admin']), deleteUser);

export default router;