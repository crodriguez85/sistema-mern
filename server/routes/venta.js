import express from 'express';
import ventaController from '../controllers/VentaController';
import auth from '../middlewares/auth';
const router = express.Router();

router.post('/add', auth.verifyVendedor, ventaController.add);
router.get('/query', auth.verifyVendedor, ventaController.query);
router.get('/list', auth.verifyVendedor, ventaController.list);
router.put('/activate', auth.verifyVendedor, ventaController.activate);
router.put('/deactivate', auth.verifyVendedor, ventaController.deactivate);

export default router;
