import express from 'express';
import usuarioController from '../controllers/UserController';
import auth from '../middlewares/auth';
const router = express.Router();

router.post('/add', auth.verifyAdministrador, usuarioController.add);
router.get('/query', auth.verifyAdministrador, usuarioController.query);
router.get('/list', auth.verifyAdministrador, usuarioController.list);
router.put('/update', auth.verifyAdministrador, usuarioController.update);
router.delete('/remove', auth.verifyAdministrador, usuarioController.remove);
router.put('/activate', auth.verifyAdministrador, usuarioController.activate);
router.put('/deactivate', auth.verifyAdministrador, usuarioController.deactivate);
router.post('/login', usuarioController.login);

export default router;
