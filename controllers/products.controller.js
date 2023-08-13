const {getProductById,createProduct}=require('../services/product.services')

const buscarProductController = async (req, res) => {
  try {
    let producto = req.params.pid;
    let produc = await getProductById(producto)
    console.log(produc);
    if (produc) {
      res.render("detalle", produc);
    } else {
      res.status(404).json({ error: "Producto no encontrado" });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({ error: "Internal server error" });
  }
};
const guardarProductController=async (req, res) => {
  const savedProduct = await createProduct(req.body);
}

module.exports = {
  buscarProductController,
  guardarProductController
};
