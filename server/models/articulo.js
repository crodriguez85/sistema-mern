import mongoose, { Schema } from 'mongoose';

const articuloSchema = new Schema({
    categoria: { type: Schema.ObjectId, ref: 'categoria' },
    codigo: {},
    nombre: {},
    descripcion: {},
    precio_venta: {},
    stock: {},
    estado: {},
    createdAt: {},
});

const Articulo = mongoose.model('articulo', articuloSchema);

export default Articulo;