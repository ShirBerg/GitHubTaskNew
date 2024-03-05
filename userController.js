const getUsersById = async (req, res) => {

    const { id } = req.params
    
        const user = await Users.findById(id).lean()
        if (!user)
            return res.status(404).json("No user found")
        res.status(200).json(user)
   }

const createUsers = async (req, res) => {
    const { name, email, phone } = req.body
   
    const user = await Users.create({ name, email, phone })
    if (!user) return res.status(500).json("Error")
    res.json(user)
}

const updateUsers = async (req, res) => {
    const { id, name, email, phone } = req.body
    const user = await Users.findById(id).exec()
    user.name = name
    user.email = email
    user.phone = phone
    const newUsers = await user.save()
    res.json(`Update users ${id} success`)
}
const deleteUsers = async (req, res) => {
    const { id } = req.body
    const user = await Users.findById(id).exec()
    const deleted = await user.deleteOne()
    res.json(`Deleted users`)
}
module.exports = { getUsersById, createUsers, updateUsers, deleteUsers }
