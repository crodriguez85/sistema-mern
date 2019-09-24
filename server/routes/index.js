import express from 'express';
import categoriaRouter from './categoria';
import articuloRouter from './articulo';
import usuarioRouter from './usuario';
import personaRouter from './persona';
import ingresoRouter from './ingreso';

const router = express.Router();

router.use('/categoria', categoriaRouter);
router.use('/articulo', articuloRouter);
router.use('/usuario', usuarioRouter);
router.use('/persona', personaRouter);
router.use('/ingreso', ingresoRouter);

export default router;
