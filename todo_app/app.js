import express from 'express';
import dotenv from 'dotenv';
import { sequelize } from './backend/src/models/index.js'; // atau path-mu
import userRoutes from './backend/src/routes/userRoute.js';
import todoRoutes from './backend/src/routes/todoRoute.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/foto', express.static('public/foto'));

// Sinkronisasi DB saat app start
(async () => {
  try {
    await sequelize.sync({ alter: true }); //tunggu tersinkronisasi dlu
    console.log('✅ Database tersinkron dengan model Sequelize'); //baru print ini
  } catch (err) {
    console.error('❌ Gagal sinkronisasi database:', err); // kalo error langsung print ini 
  }
})();

// Cek koneksi database Sequelize
app.get('/', async (req, res) => {
    try {
        await sequelize.authenticate(); // cek koneksi DB
        res.json({ message: 'DB connected (via Sequelize)' }); //kalau terkonek, maka print ini 
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        res.status(500).json({ error: 'Database connection error' });
    }
});

// Routes
app.use('/user', userRoutes); //user
app.use('/todo', todoRoutes); //tugas

// Jalankan server
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
