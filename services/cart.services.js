const Cart = require('../daos/mongodb/models/carts.model')

const createCart = async()=>{
    const newCart = new Cart()
    await newCart.save()
    return newCart
}
const getCartById = async(id)=>{
    return await Cart.findOne({ _id: id });
}

const eliminarProductDelCart = async (idCart, idProducto)=>{
    return await Cart.findOneAndUpdate(
        { _id: idCart },
        { $pull: { cart: { _id: idProducto } } },
        { new: true }
    );
}
const vaciarCarro =async(idCarrito)=>{
    return await Cart.updateOne(
        { _id: idCarrito },
        { $set: { cart: [] } }
    );
}
const actualizarCantidadCart = async(idCarrito,idProducto,count)=>{
    return await Cart.findOneAndUpdate(
        { _id: idCarrito, "cart.product": idProducto },
        { $inc: { "cart.$.count": count } },
        { new: true }
    )
}
const pushProductToCart = async(idCarrito,idProducto,count)=>{
    return await Cart.findByIdAndUpdate(
        {_id:idCarrito},
        { $push: { cart: { product: idProducto, count } } },
        { new: true }
    )
}
module.exports={
    createCart,
    getCartById,
    eliminarProductDelCart,
    vaciarCarro,
    actualizarCantidadCart,
    pushProductToCart
    
}