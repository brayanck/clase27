const User =require("../daos/mongodb/models/users.model")


const getUserByEmail = async(email)=>{
    return await User.findOne({email : email})
}
const createUser = async(userData)=>{
    return await User.create(userData)
}


module.exports={
    getUserByEmail,
    createUser
}