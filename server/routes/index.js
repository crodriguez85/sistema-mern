import express from 'express';
import categoriaRouter from './categoria';
import articuloRouter from './articulo';

const router = express.Router();

router.use('/categoria', categoriaRouter);
router.use('/articulo', articuloRouter);

export default router;
