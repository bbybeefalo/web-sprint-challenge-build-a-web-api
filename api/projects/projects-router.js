// Write your "projects" router here!
const express = require('express');
const Projects = require('./projects-model');

const router = express.Router()
router.use(express.json())


router.get('/api/projects', async (req, res) => {
    try {
        const projects = await Projects.get()
        res.status(200).json(projects)
    } catch {
        res.status(500).json({ message: 'argh' })
    }
})

router.get('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params
        const project = await Projects.get(id);
        if (!project) {
            res.status(404).json({ message: `no project found with id ${id}`})
        } else {
            res.status(200).json(project)
        }
    } catch {
        res.status(500).json({ message: 'argh' })
    }
})


module.exports = router