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

        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    list: async (req, res, next) => {
        try {

        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {

        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    remove: async (req, res, next) => {
        try {

        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    activate: async (req, res, next) => {
        try {

        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    deactivate: async (req, res, next) => {
        try {

        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    }
}