import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user.js';

export const signin = async (req, res) => {
    const { email, password } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        const passwordCHeck = await bcrypt.compare(password, existingUser.password)
        if (!existingUser) return res.status(404).json({ message: "User not found." })
        if (!passwordCHeck) return res.status(400).json({ message: "Invalid details" })
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'auth', { expiresIn: "1h" })
        res.status(200).json({ result: existingUser, token })
    } catch (error) {
        res.status(500).json({ return: 'Something went wrong' })
    }
}

export const signup = async (req, res) => {
    const { email, password, confirmPassword, firstName, lastName } = req.body;
    try {
        const existingUser = await User.findOne({ email })
        if (existingUser) return res.status(400).json({ message: "Email already taken" })
        if (password !== confirmPassword) return res.status(400).json({ message: "Password mismatch" })
        const hashPass = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashPass, name: `${firstName} ${lastName}` })
        const token = jwt.sign({ email: result.email, id: result._id }, 'auth', { expiresIn: "1h" })
        res.status(200).json({ result, token })
    } catch (error) {
        res.status(500).json({ return: 'Something went wrong' })
    }

}

