import models from '../models/index';

export default {
    add: async (req, res, next) => {
        try {
            const registroPersona = await models.Persona.create(req.body);
            res.status(200).json(registroPersona);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    query: async (req, res, next) => {
        try {
            const findPersona = await models.Persona.findOne({ _id: req.query._id});
            if(!findPersona) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(findPersona);
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
            const listPersonas = await models.Persona.find({$or: [
                // Buscar como like en sql
                {'nombre': new RegExp(valor, 'i')}, 
                {'email': new RegExp(valor, 'i')}]}, {
                // Filtro que no se vea createdat
                createdAt: 0
            })
            .sort({'createdAt': -1})
            res.status(200).json(listPersonas);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    listClientes: async (req, res, next) => {
        try {
            let valor = req.body.valor;
            const listCliente = await models.Persona.find({$or: [
                // Buscar como like en sql
                {'nombre': new RegExp(valor, 'i')}, 
                {'email': new RegExp(valor, 'i')}],
                'tipo_persona': 'Cliente'
            }, {
                // Filtro que no se vea createdat
                createdAt: 0
            })
            .sort({'createdAt': -1})
            res.status(200).json(listCliente);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    listProveedores: async (req, res, next) => {
        try {
            let valor = req.body.valor;
            const listProveedor = await models.Persona.find({$or: [
                // Buscar como like en sql
                {'nombre': new RegExp(valor, 'i')}, 
                {'email': new RegExp(valor, 'i')}],
                'tipo_persona': 'Proveedor'
            }, {
                // Filtro que no se vea createdat
                createdAt: 0
            })
            .sort({'createdAt': -1})
            res.status(200).json(listProveedor);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            const find = await models.Persona.findByIdAndUpdate({_id: req.body._id}, {
                tipo_persona: req.body.tipo_persona,
                nombre: req.body.nombre,
                tipo_documento: req.body.tipo_documento,
                num_documento: req.body.num_documento,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
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
            const removePersona = await models.Persona.findByIdAndRemove({ _id: req.body._id });
            res.status(200).json(removePersona);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    activate: async (req, res, next) => {
        try {
            const activatePersona = await models.Persona.findByIdAndUpdate({ _id: req.body._id }, {
                estado: 1,
            });
            res.status(200).json(activateUsuario)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    deactivate: async (req, res, next) => {
        try {
            const deactivatePersona = await models.Persona.findByIdAndUpdate({ _id: req.body._id }, {
                estado: 0,
            });
            res.status(200).json(deactivatePersona)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

}