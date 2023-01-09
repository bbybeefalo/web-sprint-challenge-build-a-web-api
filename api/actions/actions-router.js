const express = require('express');
const Actions = require('./actions-model');

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch {
        res.status(500).json({ message: 'oh noes'})
    }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params
        const action = await Actions.get(id);
        if (!action) {
            res.status(404).json({ message: `no action found with id ${id}` })
        } else {
            res.status(200).json(action)
        }
    } catch {
        res.status(500).json({ message: 'argh' })
    }
})

module.exports = router