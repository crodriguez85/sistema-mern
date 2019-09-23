import models from '../models/index';

export default {
    add: async (req, res, next) => {
        try {
            const registroArticulo = await models.Articulo.create(req.body);
            res.status(200).json(registroArticulo);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    query: async (req, res, next) => {
        try {
            const findArticulo = await models.Articulo.findOne({ _id: req.query._id});
            if(!findArticulo) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(findArticulo);
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
            let valor = req.body.valor;
            const listArticulos = await models.Articulo.find({$or: [
                // Buscar como like en sql
                {'nombre': new RegExp(valor, 'i')}, 
                {'descripcion': new RegExp(valor, 'i')}]}, {
                // Filtro que no se vea createdat
                createdAt: 0
            })
            .sort({'createdAt': -1})
            res.status(200).json(listArticulos);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const find = await models.Articulo.findByIdAndUpdate({id: req.body.id}, {
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
            const removeArticulo = await models.Articulo.findByIdAndRemove({ id: req.body.id });
            res.status(200).json(removeArticulo);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    activate: async (req, res, next) => {
        try {
            const activateArticulo = await models.Articulo.findByIdAndUpdate({ id: req.body.id }, {
                estado: 1,
            });
            res.status(200).json(activateArticulo)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    deactivate: async (req, res, next) => {
        try {
            const deactivateArticulo = await models.Articulo.findByIdAndUpdate({ id: req.body.id }, {
                estado: 0,
            });
            res.status(200).json(deactivateArticulo)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    }
}