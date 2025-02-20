// This file is better being called index.js
// this file is the entrypoint for loading your sequelize models and setting up associations between them

const User = require('./user');
const Task = require('./task');
const Todo = require('./todo');

// Define associations
User.hasMany(Todo); // a user can have many todos
Todo.belongsTo(User); // individual todo belongs to a user

Todo.hasMany(Task); // a todo can have many tasks
Task.belongsTo(Todo); // individual task belongs to a todo

// We do an association both ways because we want to be able to access the related model from either side of the relationship
// See: https://sequelize.org/docs/v6/core-concepts/assocs/#special-methodsmixins-added-to-instances for more information