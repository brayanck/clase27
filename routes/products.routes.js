const router = require("express").Router();
const {buscarProductController,guardarProductController}=require('../controllers/products.controller')

router.get('/:pid', buscarProductController);
router.post('/',guardarProductController)



module.exports = router;