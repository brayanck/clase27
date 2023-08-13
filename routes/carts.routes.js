const router = require("express").Router();
const {isAuthenticated} = require('../utils/auth')
const {actualizarCarroController,obtenerCarroController,buscarCarroIdController,eliminarProductoController,eliminarCarroController}=require('../controllers/carts.controllers')

router.use(isAuthenticated)


router.get('/',buscarCarroIdController);
router.get("/:cid",obtenerCarroController);
router.delete("/:cid/products/:pid",eliminarProductoController);
router.delete("/:cid",eliminarCarroController);
router.put("/:cid/products/:pid", actualizarCarroController);


module.exports = router;
