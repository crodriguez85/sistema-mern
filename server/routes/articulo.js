import express from 'express';
import articuloController from '../controllers/ArticuloController';
import auth from '../middlewares/auth';
const router = express.Router();

router.post('/add', auth.verifyAlmacenero, articuloController.add);
router.get('/query', auth.verifyAlmacenero, articuloController.query);
router.get('/list', auth.verifyAlmacenero, articuloController.list);
router.put('/update', auth.verifyAlmacenero, articuloController.update);
router.delete('/remove', auth.verifyAlmacenero, articuloController.remove);
router.put('/activate', auth.verifyAlmacenero, articuloController.activate);
router.put('/deactivate', auth.verifyAlmacenero, articuloController.deactivate);

export default router;
