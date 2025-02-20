const { Sequelize } = require('sequelize');
const User = require('../models/user');
const Todo = require('../models/todo');

// UserController manages all operations related to the User model,
// including fetching, creating, updating, and deleting users.
// It can also interact with multiple models as needed.
// For example, get all todos for a user, or get all tasks for a todo.
// This is where you can write your business logic.
const UserController = {
    async index(req, res) {
        try {
            const users = await User.findAll();
            return users;
        } catch (error) {
            throw new Error('An error occurred while fetching users.');
        }
    },
    async create(req, res) {
        try {
            const { name, email } = req.body;
            const user = await User.create({ name, email });
            return user;
        } catch (error) {
            throw new Error('An error occurred while creating the user.');
        }
    },
    async show(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [Todo]
            });
            if (user) {
                return user;
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            throw new Error('An error occurred while fetching the user.');
        }
    },
    async update(req, res) {
        try {
            const { name, email } = req.body;
            const user = await User.findByPk(req.params.id);
            if (user) {
                user.name = name;
                user.email = email;
                await user.save();
                return user;
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            throw new Error('An error occurred while updating the user.');
        }
    },
    async delete(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                await user.destroy();
                return { message: 'User deleted successfully.' };
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            throw new Error('An error occurred while deleting the user.');
        }
    },
    async createTodo(req, res) {
        try {
            const user = await User.findByPk(req.params.id);
            if (user) {
                const { title, description } = req.body;
                const todo = await Todo.create({ title, description, userId: user.id });
                return todo;
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            throw new Error('An error occurred while creating the todo.');
        }
    },
    async getUserTodos(req, res) {
        try {
            const user = await User.findByPk(req.params.id, {
                include: [Todo]
            });
            if (user) {
                return user.Todos;
            } else {
                throw new Error('User not found.');
            }
        } catch (error) {
            throw new Error('An error occurred while fetching the todos.');
        }
    }
};

module.exports = UserController;