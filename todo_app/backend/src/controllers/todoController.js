import pool from '../models/db.js';

// ✅ ADD TODO
export const addTodo = async (req, res) => {
    const { kegiatan, status } = req.body;
    const userId = req.user.id;

    try {
        const query = `
            INSERT INTO todos (kegiatan, status, userid)
            VALUES ($1, $2, $3) RETURNING *
        `;
        const result = await pool.query(query, [kegiatan, status, userId]);

        res.status(201).json({
            message: 'Tugas berhasil ditambahkan!',
            data: result.rows[0]
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
        const query = `
            SELECT * FROM todos
            WHERE userid = $1
            ORDER BY id DESC
        `;
        const result = await pool.query(query, [userId]);

        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Gagal mengambil todo' });
    }
};

// ✅ GET Todo by Id
export async function getTodoById(req, res) {
  const { id } = req.params;
  try {
    const todo = await Todo.findOne({
      where: {
        id,
        userId: req.user.id, // pastikan cuma ambil data todo milik user yang login
      }
    });

    if (!todo) {
      return res.status(404).json({ message: 'Todo tidak ditemukan' });
    }

    res.json(todo);
  } catch (error) {
    res.status(500).json({ message: 'Gagal mengambil data todo', error: error.message });
  }
}


// ✅ UPDATE TODO
export const updateTodo = async (req, res) => {
    const { id } = req.params;
    const { kegiatan, status } = req.body;

    try {
        const result = await pool.query(
            'UPDATE todos SET kegiatan = $1, status = $2 WHERE id = $3 AND userid = $4 RETURNING *',
            [kegiatan, status, id, req.user.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Todo tidak ditemukan atau bukan milik Anda' });
        }

        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({ message: 'Gagal update todo', error: err.message });
    }
};

// ✅ DELETE TODO
export const deleteTodo = async (req, res) => {
    const { id } = req.params;

    try {
        const result = await pool.query(
            'DELETE FROM todos WHERE id = $1 AND userid = $2 RETURNING *',
            [id, req.user.id]
        );

        if (result.rowCount === 0) {
            return res.status(404).json({ message: 'Todo tidak ditemukan atau bukan milik Anda' });
        }

        res.json({ message: 'Todo berhasil dihapus' });
    } catch (err) {
        res.status(500).json({ message: 'Gagal hapus todo', error: err.message });
    }
};
