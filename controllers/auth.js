const UserModel = require("../models/UserModel")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')


const createUser = async (req, res) => {
  const { email } = req.body

  try {
    let user = await UserModel.findOne({ email })
    if (user) {
      return res.status(400).json({ msg: "User Exists" })
    }

    const password = await bcrypt.hash(req.body.password, 10)
    user = new UserModel({ ...req.body, password, roles: 'user' })
    await user.save()

    const { _id, username, roles } = user
    const token = jwt.sign({ _id, username, roles, email }, process.env.JWT_SECRET, { expiresIn: '2h' })

    return res.status(201).json({ user: {_id, username, roles, email }, token })
  } catch (error) {
    console.log('createUser Error: ', error)
    return res.status(500).json({ message: 'Server Error' })
  }
}

const loginUser = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await UserModel.findOne({ email })
    if (!user)
      return res.status(400).json({ msg: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch)
      return res.status(400).json({ msg: "Invalid credentials" })


    const { _id, username, roles } = user
    const token = jwt.sign({ _id, username, roles, email }, process.env.JWT_SECRET, { expiresIn: '2h' })

    return res.json({ user: {_id, username, roles, email }, token })

  } catch (error) {
    console.log('loginUser Error: ', error)
    return res.status(500).json({ message: 'Server Error' })
  }


}

const revalidateToken = (req, res) => {
  const { user } = req
  const { _id, username, roles, email } = user
  const token = jwt.sign({ _id, username, roles, email }, process.env.JWT_SECRET, { expiresIn: '2h' })


  res.json({ user: { _id, username, roles, email }, token })
}

const logoutUser = (req, res) => {

  res.json({
    message: 'Logout Successful'
  })
}

module.exports = {
  createUser,
  loginUser,
  revalidateToken,
  logoutUser
}