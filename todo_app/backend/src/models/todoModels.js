const TodoModel = (sequelize, DataTypes) => {
  const Todo = sequelize.define('todos', {
    kegiatan: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    status: {
      type: DataTypes.BOOLEAN, // bisa diganti BOOLEAN kalau kamu mau pakai true/false
      allowNull: false,
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });

  return Todo;
};

export default TodoModel;
