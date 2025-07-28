import express from 'express';
import pool from './models/db.js';
import dotenv from 'dotenv'
import userRoutes from './routes/userRoute.js';
import todoRoutes from './routes/todoRoute.js';

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.urlencoded());
app.use(express.json()); // supaya bisa baca JSON dari req.body
app.use('/foto', express.static('public/foto'));

// Coba endpoint test koneksi DB
app.get('/', async (req, res) => {
    try {
        const result = await pool.query('SELECT NOW()');
        res.json({ message: 'DB connected', time: result.rows[0] });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Database connection error' });
    }
});

// akses user route
app.use('/user', userRoutes);

//masukin tugas
app.use('/todo', todoRoutes);

//confirm berjalan dimana
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});