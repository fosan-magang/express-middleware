import { User } from "../models/index.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register
export const registerUser = async (req, res) => {
    const { name, email, password } = req.body;
    const foto = req.file.filename;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);

        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
            foto
        });

        res.status(201).json({
            message: "Sign Up, Success!",
            data: newUser
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to register user" });
    }
};

// Login
export const loginUser = async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: "Email dan password wajib diisi" });
    }

    try {
        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json({ message: "Email tidak terdaftar" });
        }

        const isMatch = await bcrypt.compare(password, user.password);

        if (!isMatch) {
            return res.status(401).json({ message: "Password salah" });
        }

        const token = jwt.sign(
            { id: user.id, name: user.name },
            process.env.JWT_SECRET || "rahasia123",
            { expiresIn: "1h" }
        );

        res.status(200).json({
            message: "Sign In, Success!",
            token,
            user: {
                id: user.id,
                name: user.name,
                email: user.email,
                foto: `${req.protocol}://${req.get("host")}/foto/${user.foto}`
            }
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Login failed" });
    }
};

// Get Profile
export const getUserProfile = async (req, res) => {
    try {
        const userId = req.user.id;
        const user = await User.findByPk(userId, {
            attributes: ['id', 'name', 'email', 'foto']
        });

        if (!user) {
            return res.status(404).json({ message: "User tidak ditemukan" });
        }

        const userData = user.toJSON();
        userData.foto = `${req.protocol}://${req.get("host")}/foto/${user.foto}`;

        res.json({
            message: "Profile ditemukan!",
            data: userData
        });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Gagal mendapatkan profile user" });
    }
};
