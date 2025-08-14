import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';
import UserModel from './userModels.js';
import TodoModel from './todoModels.js';

// Inisialisasi model
const User = UserModel(sequelize, DataTypes);
const Todo = TodoModel(sequelize, DataTypes);

// Relasi
User.hasMany(Todo, { foreignKey: 'userId' });
Todo.belongsTo(User, { foreignKey: 'userId' });

// Named export
export { sequelize, User, Todo };

// Default export (biar bisa pakai import default)
export default { sequelize, User, Todo };
