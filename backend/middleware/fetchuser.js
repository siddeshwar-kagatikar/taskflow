const jwt = require('jsonwebtoken')
const JWT_SECRET = "savetimesavemoney1145"

const fetchuser = (req,res,next) => {
    const token = req.header('autoken')
    if(!token){
        res.status(401).send({ error: "please authenticate using a valid token" })
    }
    const data = jwt.verify(token,JWT_SECRET)
    // console.log(data)
    req.user = data.user
    next()
}

module.exports = fetchuser