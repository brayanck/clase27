const Product = require('../daos/mongodb/models/products.model')

const getProductById = async (idProducto)=>{
    return await Product.findOne({ _id: idProducto })
}
const createProduct=async(Data)=>{
    return await Product.create(Data)
}
const paginacion =async(query,limit=10,page=1,sort)=>{
    return await Product.paginate(query, { limit:limit, page:page, sort: sort })
}
module.exports={
    getProductById,
    createProduct,
    paginacion
}