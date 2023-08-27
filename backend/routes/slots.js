const express = require('express')
const Slot = require('../modules/Slot')
const router = express.Router()
const { body, validationResult } = require('express-validator');
const fetchuser = require('../middleware/fetchuser')

// Route 1: fetch all data of the user
router.get('/fetchalldata',fetchuser, async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try{
        let slots = await Slot.find({user: req.user.id})
        // console.log(`from note side:${req.user.id}`);
        res.json(slots)
    }catch(error){
        console.error(error.message);
        res.status(500).send("some error occured while fetching data");
    }
})

// Route 2: createslot taking input from user
router.post('/createslot',fetchuser,async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try{
        const {title,dewdate, priority,status,description} = req.body
        const slot = await Slot.create({
            title,dewdate, priority,status,description, user: req.user.id
        })
        console.log( req.user.id)
        res.json(slot)
    }catch(error){
        console.error(error.message);
        res.status(500).send({ error: "unable to add the slot" });
    }
})

// Route 3: delete a slot
router.delete('/delete/:id',fetchuser, async (req,res) => {
    // const errors = validationResult(req);
    // if (!errors.isEmpty()) {
    //     return res.status(400).json({errors: errors.array() });
    // }
    try{
        let slot = await Slot.findById(req.params.id)
        if(!slot){
            return res.status(404).send({ error: "not found" })
        }
        if (slot.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }
        // console.log(req.params.id)
        const delnote = await Slot.findByIdAndDelete(req.params.id)
        // console.log(delnote)
        res.json(delnote)
    }catch(error){
        console.error(error.message);
        res.status(500).send({ error: "unable to delete the slot" });
    }
})

// Route 4: updation of the slot
router.put('/update/:id',fetchuser,async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try{
        const newSlot = {}
        let slot = await Slot.findById(req.params.id)
        if (!slot) {
            return res.status(404).send({ error: "not found" })
        }
        if (slot.user.toString() !== req.user.id) {
            return res.status(401).send("not allowed");
        }

        const {title,dewdate, priority,status,description} = req.body 
        if(title) {newSlot.title = title}
        if(dewdate) {newSlot.dewdate = dewdate}
        if(priority) {newSlot.priority = priority}
        if(status) {newSlot.status = status}
        if(description) {newSlot.description = description}

        slot = await Slot.findByIdAndUpdate(req.params.id, newSlot)
        res.json({ slot });
    }catch(error){
        console.error(error.message);
        res.status(500).send({ error: "unable to update the slot" });
    }
})

// Route 5: sort
router.post('/sort',fetchuser,async(req,res)=>{
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try{
        let tmp = await Slot.find({user: req.user.id})
        const n = tmp.length
        for(let i=0; i<n; i++)
        {
            if(tmp[i].priority === 1){
                const tmpslot = await Slot.findByIdAndDelete(tmp[i]._id)
                console.log(tmpslot)
                const slot = await Slot.create({"dewdate": tmpslot.dewdate,
                                                "priority": tmpslot.priority,
                                                "status": tmpslot.status,
                                                "description": tmpslot.description,
                                                "title":tmpslot.title,
                                                user : req.user.id
                                            })
                console.log(slot)
            }
        }
        for(let i=0; i<n; i++)
        {
            if(tmp[i].priority === 2){
                const tmpslot = await Slot.findByIdAndDelete(tmp[i]._id)
                console.log(tmpslot)
                const slot = await Slot.create({"dewdate": tmpslot.dewdate,
                                                "priority": tmpslot.priority,
                                                "status": tmpslot.status,
                                                "description": tmpslot.description,
                                                "title":tmpslot.title,
                                                user : req.user.id
                                            })
                console.log(slot)
            }
        }
        for(let i=0; i<n; i++)
        {
            if(tmp[i].priority === 3){
                const tmpslot = await Slot.findByIdAndDelete(tmp[i]._id)
                console.log(tmpslot)
                const slot = await Slot.create({"dewdate": tmpslot.dewdate,
                                                "priority": tmpslot.priority,
                                                "status": tmpslot.status,
                                                "description": tmpslot.description,
                                                "title":tmpslot.title,
                                                user : req.user.id
                                            })
                console.log(slot)
            }
        }
        tmp = await Slot.find({user: req.user.id})
        res.json(tmp)
    }catch(error){
        console.error(error.message);
        res.status(500).send({ error: "error in updation" });
    }
})

// Route 6: delete all
router.delete('/delall', fetchuser, async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try{
        console.log(req.user)
        const data = await Slot.deleteMany({"user":req.user.id})
        res.json(data)
    }catch(error){
        console.error(error.message);
        res.status(500).send({ error: "error, can't delete all slots" });
    }
})

// Route 7: add all
router.post('/postall',fetchuser,async(req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array() });
    }
    try{
       req.body.map(async(item) => {
        const {title,dewdate, priority,status,description} = item
        const slot = await Slot.create({
            title,
            "dewdate": String(dewdate).slice(0,10),
            priority,
            status,
            description,
            user: req.user.id,
        })
       })
       res.json(req.body)
    }catch(error){
        console.error(error.message);
        res.status(500).send({ error: "error, can't add all slots" });
    }
})

module.exports = router