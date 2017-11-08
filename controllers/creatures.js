const express = require('express')
const router = express.Router()

const { Creature } = require('../db/schema.js')

router.get('/', async (req, res) => {
    try{
        const creatures = await Creature.find({})
        res.json(creatures)
    } catch (err) {
        console.log(err)
    }
})

router.get('/:id', async (req, res) => {
    try{
        creatureId = req.params.id
        const creature = await Creature.findById(creatureId)
        res.json(creature)
    } catch (err) {
        console.log(err)
    }
})

router.post('/', async (req, res) => {
    try{
        const newCreature = req.body
        const savedCreature = await Creature.create(newCreature)
        res.json(savedCreature)
    } catch (err) {
        console.log(err)
    }
})

router.put('/:id', async (req, res) => {
    try{
        const creatureId = req.params.id
        const updatedCreature = req.body
        const savedCreature = await Creature.findByIdAndUpdate(creatureId, updatedCreature, {new: true})
        res.json(savedCreature)
    } catch (err) {
        console.log(err)
    }
})

router.delete('/:id', async (req, res) => {
    try{
        const creatureId = req.params.id
        const creature = await Creature.findByIdAndRemove(creatureId)
        res.json({
            msg: 'Deleted that mutha'
        })
    } catch (err) {
        console.log(err)
    }
})

module.exports = router