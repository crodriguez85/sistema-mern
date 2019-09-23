import models from '../models/index';

export default {
    add: async (req, res, next) => {
        try {
            const registroCategoria = await models.Categoria.create(req.body);
            res.status(200).json(registroCategoria);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    query: async (req, res, next) => {
        try {
            const findCategoria = await models.Categoria.findOne({ _id: req.query._id});
            if(!findCategoria) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(findCategoria);
            }
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    list: async (req, res, next) => {
        try {
            let valor = req.query.valor;
            const listCategorias = await models.Categoria.find({
                // RegExp = like en sql
                'nombre': new RegExp(valor, 'i')
            }, {
                // Filtros de Busqueda
                // No muestre CreatedAt
                createdAt: 0
            })
            .sort({'createdAt': -1})
            res.status(200).json(listCategorias);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const find = await models.Categoria.findByIdAndUpdate({_id: req.body._id}, {
                nombre: req.body.nombre,
                descripcion: req.body.descripcion
            })
            res.status(200).json(find)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {
            const removeCategoria = await models.Categoria.findByIdAndRemove({ _id: req.body._id });
            res.status(200).json(removeCategoria);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    activate: async (req, res, next) => {
        try {
            const activateCategoria = await models.Categoria.findByIdAndUpdate({ _id: req.body._id }, {
                estado: 1,
            });
            res.status(200).json(activateCategoria)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    deactivate: async (req, res, next) => {
        try {
            const deactivateCategoria = await models.Categoria.findByIdAndUpdate({ _id: req.body._id }, {
                estado: 0,
            });
            res.status(200).json(deactivateCategoria)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    }
}