import { Todo } from '../models/index.js';

// ✅ ADD TODO
export const addTodo = async (req, res) => {
  const { kegiatan, status } = req.body;
  const userId = req.user.id;

  try {
    const todo = await Todo.create({
      kegiatan,
      status,
      userId,
    });

    res.status(201).json({
      message: 'Tugas berhasil ditambahkan!',
      data: todo,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Gagal menambahkan tugas' });
  }
};

// ✅ GET TODOS
export const getTodos = async (req, res) => {
  const userId = req.user.id;

  try {
    const todos = await Todo.findAll({
      where: { userId },
      order: [['id', 'DESC']],
    });

    res.json(todos);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Gagal mengambil todo' });
  }
};

// ✅ GET Todo by ID
export const getTodoById = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo tidak ditemukan' });
    }

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Gagal mengambil data todo', error: err.message });
  }
};

// ✅ UPDATE TODO
export const updateTodo = async (req, res) => {
  const { id } = req.params;
  const { kegiatan, status } = req.body;

  try {
    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo tidak ditemukan atau bukan milik Anda' });
    }

    todo.kegiatan = kegiatan;
    todo.status = status;
    await todo.save();

    res.json(todo);
  } catch (err) {
    res.status(500).json({ message: 'Gagal update todo', error: err.message });
  }
};

// ✅ DELETE TODO
export const deleteTodo = async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id,
      },
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo tidak ditemukan atau bukan milik Anda' });
    }

    await todo.destroy();

    res.json({ message: 'Todo berhasil dihapus' });
  } catch (err) {
    res.status(500).json({ message: 'Gagal hapus todo', error: err.message });
  }
};
