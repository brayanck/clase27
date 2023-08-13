const {getCartById,eliminarProductDelCart,vaciarCarro,actualizarCantidadCart,pushProductToCart}=require('../services/cart.services')
const {getUserByEmail}= require('../services/user.services')
const {getProductById}=require('../services/product.services')
const buscarCarroIdController = async (req, res) => {
    try {
        const usuarioEmail = req.user.email;
        const usuario = await getUserByEmail(usuarioEmail);
        console.log(usuario)
        if (!usuario) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        console.log(usuario.cartId)
        res.json(usuario.cartId);
    } catch (error) {
        console.error('Error al obtener el carrito:', error);
        res.status(500).json({ error: 'Error interno del servidor' });
    }
}
const obtenerCarroController = async (req, res) => {
    try {
        let carrito = req.params.cid;
        let carro = await getCartById(carrito);
        res.render("cart", { carro });
    } catch (err) {
        console.log(err)
        return res.status(500).json({ error: "Internal server error" });
    }
}

const eliminarProductoController = async (req, res) => {
    try {
        let carrito = req.params.cid;
        let producto = req.params.pid;
        const cart = await getCartById(carrito);
        if (cart) {
            const updatedCart = await eliminarProductDelCart(carrito,producto)
            res.json(updatedCart);
        }
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
const eliminarCarroController = async (req, res) => {
    try {
        let carrito = req.params.cid;
        const result = await vaciarCarro(carrito);
        res.json(result);
    } catch (err) {
        return res.status(500).json({ error: "Internal server error" });
    }
}
const actualizarCarroController = async (req, res) => {
    try {
        const count = req.body.count;
        const carrito = req.params.cid;
        const producto = req.params.pid;
        const carro = await getCartById(carrito);
        const product = await getProductById(producto);
        if (carro && product) {
            const cartItem = carro.cart.find((item) => {
                if (item.product._id.toString() === producto.toString()) {
                    return true
                }
            });
            if (cartItem) {
                const updatedCart = await actualizarCantidadCart(carrito,product,count);
                return res.json(updatedCart);
            } else {
                const updatedCart = await pushProductToCart(carrito,product._id,count);
                return res.json(updatedCart);
            }
        } else {
            res.json("El producto o el carrito no existen");
        }
    } catch (err) {
        return res.status(500).json({ error: err });
    }
}


module.exports = {
    buscarCarroIdController,
    obtenerCarroController,
    eliminarProductoController,
    eliminarCarroController,
    actualizarCarroController
}