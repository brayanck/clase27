const router = require("express").Router();
const {isAuthenticated} = require('../utils/auth')
const {paginateController}=require('../controllers/paginate.controller')

router.use(isAuthenticated)

router.get('/api/',paginateController);



module.exports = router;