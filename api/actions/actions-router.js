const express = require('express');
const Actions = require('./actions-model');
const Projects = require('../projects/projects-model')

const router = express.Router();
router.use(express.json());

router.get('/', async (req, res) => {
    try {
        const actions = await Actions.get()
        res.status(200).json(actions)
    } catch {
        res.status(500).json({ message: 'oh noes' })
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

router.post('/', async (req, res) => {
    try {
        const { project_id, description, notes, completed } = req.body
        if ( !project_id || !description || !notes ) {
            res.status(400).json({ message: 'every action needs the project id, a description, and notes'})
        } else {
            if (project_id ) {
            const newNote = await Actions.insert({ project_id, description, completed, notes })
            res.json(newNote)
            }
        }
    } catch {
        res.status(500).json({ message: 'argh' })
    }
})

module.exports = router