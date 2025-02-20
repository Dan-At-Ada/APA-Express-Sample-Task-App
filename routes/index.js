const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');
const TodoController = require('../controllers/todoController');
const TaskController = require('../controllers/taskController');

router.get('/', async (req, res) => {
    try {
        const users = await UserController.index(req, res);
        res.render('index', {
            title: 'Todo App',
            users: users
        });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

router.get('/users/:id', async (req, res) => {
    try {
        const user = await UserController.show(req, res);
        res.render('user', { user: user });
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

router.post('/users', async (req, res) => {
    try {
        await UserController.create(req, res);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

router.put('/users/:id', async (req, res) => {
    try {
        await UserController.update(req, res);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

router.delete('/users/:id', async (req, res) => {
    try {
        await UserController.delete(req, res);
        res.redirect('/');
    } catch (error) {
        res.status(500).render('error', { error: error.message });
    }
});

module.exports = router;