const { Sequelize, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
    title: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: true
    },
    // In SQL we would have a foreign key constraint here
    // but in Sequelize we define associations separately
    // so we don't need to define the foreign key here
});

module.exports = Task;
