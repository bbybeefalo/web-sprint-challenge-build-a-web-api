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
            res.status(404).json({ message: `no project found with id ${id}` })
        } else {
            res.status(200).json(project)
        }
    } catch {
        res.status(500).json({ message: 'argh' })
    }
})

router.post('/api/projects', async (req, res) => {
    try {
        const { name, description, completed } = req.body
        if (!name || !description) {
            res.status(400).json({ message: 'every project requires name and description' })
        } else {
            const newProject = await Projects.insert({ name, description, completed })
            res.status(201).json(newProject)
        }
    } catch {
        res.status(500).json({ message: 'error creating project' })
    }
})

router.put('/api/projects/:id', async (req, res) => {
    try {
        const { id } = req.params
        const { name, description, completed } = req.body
        if (!name || !description) {
            res.status(400).json({ message: 'name and description required' })
        }
        const updatedProject = await Projects.update(id, { name, description, completed })
        if (!updatedProject) {
            res.status(404).json({ message: `could not find project with id ${id}` })
        } else {
            res.status(400).json({ updatedProject })
        }
    } catch {
        res.status(500).json({ message: 'error updating project' })
    }
})

module.exports = router