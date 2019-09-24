import models from '../models/index';

export default {
    add: async (req, res, next) => {
        try {
            const registroIngreso = await models.Ingreso.create(req.body);
            res.status(200).json(registroIngreso);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    query: async (req, res, next) => {
        try {
            const findIngreso = await models.Ingreso.findOne({ _id: req.query._id})
            .populate('usuario', {nombre: 1})
            .populate('persona', { nombre: 1});
            if(!findIngreso) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(findIngreso);
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
            const listIngresos = await models.Ingreso.find({$or: [
                // Buscar como like en sql
                {'num_comprobante': new RegExp(valor, 'i')}, 
                {'serie_comprobante': new RegExp(valor, 'i')}]}, {
            })
            .populate('usuario', { nombre: 1 })
            .populate('persona', { nombre: 1 })
            .sort({'createdAt': -1})
            res.status(200).json(listIngresos);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    activate: async (req, res, next) => {
        try {
            const activateIngreso = await models.Ingreso.findByIdAndUpdate({ _id: req.body._id }, {
                estado: 1,
            });
            res.status(200).json(activateIngreso)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    deactivate: async (req, res, next) => {
        try {
            const deactivateIngreso = await models.Ingreso.findByIdAndUpdate({ _id: req.body._id }, {
                estado: 0,
            });
            res.status(200).json(deactivateIngreso)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    }
}