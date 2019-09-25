import models from '../models/index';
async function aumentarStock(idarticulo, cantidad){
    let { stock } = await models.Articulo.findOne({_id: idarticulo});
    let nStock = parseInt(stock) + parseInt(cantidad);
    const registroAumentoStock = await models.Articulo.findByIdAndUpdate(
        {_id: idarticulo}, 
        {stock: nStock}
    );
}

async function disminuirStock(idarticulo, cantidad){
    let { stock } = await models.Articulo.findOne({_id: idarticulo});
    let nStock = parseInt(stock) - parseInt(cantidad);
    const registroDismuirStock = await models.Articulo.findByIdAndUpdate(
        {_id: idarticulo}, 
        {stock: nStock}
    );
}

export default {
    add: async (req, res, next) => {
        try {
            const registroVenta = await models.Venta.create(req.body);
            // Actualizo Stock
            let detalles = req.body.detalles;
            detalles.map(function(x){
                disminuirStock(x._id, x.cantidad);
            })
            res.status(200).json(registroVenta);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    query: async (req, res, next) => {
        try {
            const findVenta = await models.Venta.findOne({ _id: req.query._id})
            .populate('usuario', {nombre: 1})
            .populate('persona', { nombre: 1});
            if(!findVenta) {
                res.status(404).send({
                    message: 'El registro no existe'
                });
            } else {
                res.status(200).json(findVenta);
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
            const listVentas = await models.Venta.find({$or: [
                // Buscar como like en sql
                {'num_comprobante': new RegExp(valor, 'i')}, 
                {'serie_comprobante': new RegExp(valor, 'i')}]}, {
            })
            .populate('usuario', { nombre: 1 })
            .populate('persona', { nombre: 1 })
            .sort({'createdAt': -1})
            res.status(200).json(listVentas);
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    activate: async (req, res, next) => {
        try {
            const activateVenta = await models.Venta.findByIdAndUpdate({ _id: req.body._id }, {
                estado: 1,
            });
            let detalles = activateVenta.detalles;
            detalles.map(function(x){
                disminuirStock(x._id, x.cantidad);
            })
            res.status(200).json(activateVenta)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    },

    deactivate: async (req, res, next) => {
        try {
            const deactivateVenta = await models.Venta.findByIdAndUpdate({ _id: req.body._id }, {
                estado: 0,
            });
            let detalles = deactivateVenta.detalles;
            detalles.map(function(x){
                aumentarStock(x._id, x.cantidad);
            });
            res.status(200).json(deactivateVenta)
        } catch (error){
            res.status(500).send({
                message: 'Ocurrio un Error'
            });
            next(error);
        }
    }
}