import models from '../models/index';
import bcrypt from 'bcryptjs';

export default {
    add: async (req, res, next) => {
        try {
            req.body.password = await bcrypt.hash(req.body.password, 10);
            const registroUsuario = await models.Usuario.create(req.body);
            res.status(200).json(registroUsuario);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    query: async (req, res, next) => {
        try {
            const findUsuario = await models.Usuario.findOne({ _id: req.query._id});
            if(!findUsuario) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(findUsuario);
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
            const listUsuarios = await models.Usuario.find({$or: [
                // Buscar como like en sql
                {'nombre': new RegExp(valor, 'i')}, 
                {'email': new RegExp(valor, 'i')}]}, {
                // Filtro que no se vea createdat
                createdAt: 0
            })
            .sort({'createdAt': -1})
            res.status(200).json(listUsuarios);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    update: async (req, res, next) => {
        try {
            let pass = req.body.password;
            const findUser = await models.Usuario.findOne({ _id: req.body._id });
            if(pass != findUser) {
                req.body.password = await bcrypt.hash(req.body.password, 10);
            }
            const find = await models.Usuario.findByIdAndUpdate({_id: req.body._id}, {
                rol: req.body.rol,
                nombre: req.body.nombre,
                tipo_documento: req.body.tipo_documento,
                num_documento: req.body.num_documento,
                direccion: req.body.direccion,
                telefono: req.body.telefono,
                email: req.body.email,
                password: req.body.password
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
            const removeUsuario = await models.Usuario.findByIdAndRemove({ _id: req.body._id });
            res.status(200).json(removeUsuario);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    activate: async (req, res, next) => {
        try {
            const activateUsuario = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, {
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
            const deactivateUsuario = await models.Usuario.findByIdAndUpdate({ _id: req.body._id }, {
                estado: 0,
            });
            res.status(200).json(deactivateUsuario)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    login: async (req, res, next) => {
        try {
            let user = await models.Usuario.findOne({email: req.body.email});
            if(user) {
                // Existe Usuario con Mail
                let match = await bcrypt.compare(req.body.password, user.password);
                if (match){
                    res.json({
                        'Password Correcto'
                    })
                } else {
                    res.status(404).send({
                        message: 'Password Incorrecto'
                    })
                }
            } else {
                res.status(404).send({
                    message: 'No existe el usuario'
                });
            }
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    }
}