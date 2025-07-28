import pool from '../models/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

//register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const foto = req.file.filename; // ambil nama file dari multer

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const query = `
        INSERT INTO users (name, email, password, foto)
        VALUES ($1, $2, $3, $4) RETURNING *
        `;
        const values = [name, email, hashedPassword, foto];

        const result = await pool.query(query, values);

        res.status(201).json({
            message: 'Sign Up, Success!',
            data: result.rows[0]
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Failed to register user' });
    }
};

export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email dan password wajib diisi' });
    }

    try {
        const userQuery = 'SELECT * FROM users WHERE email = $1';
        const userResult = await pool.query(userQuery, [email]);

        if (userResult.rows.length === 0) {
            return res.status(404).json({ message: 'Email tidak terdaftar' });
        }

        const user = userResult.rows[0];
        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: 'Password salah' });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET || 'rahasia123',
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Sign In, Success!',
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                foto: `${req.protocol}://${req.get('host')}/foto/${user.foto}`
            }
        });

    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Login failed' });
    }
};


export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const result = await pool.query(
            'SELECT id, name, email, foto FROM users WHERE id = $1',
            [userId]
        );

        if (result.rows.length === 0) {
            return res.status(404).json({ message: 'User tidak ditemukan' });
        }

        const user = result.rows[0];
        user.foto = `${req.protocol}://${req.get('host')}/foto/${user.foto}`;

        res.json({
            message: 'Profile ditemukan!',
            data: user
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: 'Gagal mendapatkan profile user' });
    }
};
