const jwt = require("jsonwebtoken")


const validateToken = (req, res, next) => {

  const authHeader = req.headers.authorization
  const token = authHeader && authHeader.split(' ')[1]

  if (token == null) return res.sendStatus(401)

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET)
    req.user = decoded
    next()

  } catch (error) {
    console.log(error)
    return res.status(500).json({ message: 'Invalid token' })
  }
}


module.exports = validateToken