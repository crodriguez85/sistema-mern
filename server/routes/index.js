import express from 'express';
import categoriaRouter from './categoria';

const router = express.Router();

router.use('/categoria', categoriaRouter);

export default router;
