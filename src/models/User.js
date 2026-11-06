const { DataTypes } = require('sequelize');
const connection = require('../config/database');

const User = connection.define('User', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    firstname: {
        type: DataTypes.STRING,
        allowNull: false // preenchimento obrigatório
    },
    surname: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'users',
    timestamps: true, // Gera created_at e updated_at
    createdAt: 'created_at',
    updatedAt: 'updated_at'
});

module.exports = User;