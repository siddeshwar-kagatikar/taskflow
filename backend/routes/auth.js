const express = require('express');
const User = require('../modules/User');
const router = express.Router();
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const JWT_SECRET = "savetimesavemoney1145"
const fetchuser = require('../middleware/fetchuser')

router.use('/createuser', [
    body('name').isLength({ min: 3 }),
    body('email').isEmail(),
    body('password').isLength({ min: 5 })
])

// Route 1: create a user using: POST "/api/auth/createuser". No login required
router.post('/createuser', async (req, res) => {
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({success, errors: errors.array() });
    }
    
    try {
        let user = await User.findOne({ email: req.body.email })
        if (user) {
            return res.status(400).json({success, error: "A user with this email already exists" })
        }

        user = await User.create({
            name: req.body.name,
            password: req.body.password,
            email: req.body.email
        })

        const data = {
            user: {
                id: user.id
            }
        }

        success = true
        const autoken = jwt.sign(data, JWT_SECRET);
        res.json({success,autoken });
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Some error occurred");
    }
})


router.use('/login',[
    body('email',"enter correct credentials").isEmail(),
    body('password',"enter correct credentials").exists()
])
// Route 2: login
router.post('/login', async (req, res) => {
    // If ther are erroers, return bad request and the errors
    let success = false
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    console.log(req.body.email)
    try {
        const user = await User.findOne({ email: req.body.email })
        console.log(user)
        if (!user) {
            return res.status(400).json({success, error: "sorry user does not exist" })
        }
        if (req.body.password !== user.password) {
            return res.status(400).json({success, error: "incorrect credentials" })
        }
        const data = {
            user: {
                id: user.id
            }
        }
        success = true
        const autoken = jwt.sign(data, JWT_SECRET);
        console.log(autoken)
        res.json({success,autoken })
    } catch (error) {
        console.error(error.message);
        res.status(500).send("error in login");
    }
})

// Route 3: fetch user
router.post('/getuser',fetchuser,async (req,res) => {
    try{
        const userdata = await User.findById(req.user.id).select("-password")
        res.json(userdata)
    }catch(error){
        console.error(error.message);
        res.status(500).send("error at backend IN FETCHING data");
    }
    
})

module.exports = router
