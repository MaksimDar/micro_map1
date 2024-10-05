
import bcrypt from 'bcryptjs'
import User from '../models/User.js'

export const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;
        console.log(`register body is ${req.body}`);
        if (password.length < 8) return res.status(400).json({ success: false, message: 'The password must consist 8 characters' });
        const emailLowerCase = email.toLowerCase();
        const existedUser = await User.findOne({ email: emailLowerCase });
        if (existedUser) return res.status(400).json({ success: false, message: "This account is already registered" });
        const hashedPassword = await bcrypt.hash(password, 12);
        const user = await User.create({
            name,
            email: emailLowerCase,
            password: hashedPassword,
        });
        const { _id: id, photoURL } = user;
        const token = jwt.sign({ id, name, photoURL }, process.env.JWT_SECRET, { expiresIn: '1h' });
        res.status(201).json({ success: true, result: { id, name, email: user.email, photoURL, token } });

    } catch (error) {
        console.log(error);
        res.status(500).json({ success: false, message: 'Something went wrong! Try again' });

    }
}