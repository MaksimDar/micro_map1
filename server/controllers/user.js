
import bcrypt from 'bcryptjs'
import User from '../models/User.js'
import jwt from 'jsonwebtoken'
import tryCatch from './utils/tryCatch.js';

export const register = tryCatch(async (req, res) => {

    const { name, email, password } = req.body;
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
    res.status(201).json({ success: true, result: { id, name, email: user.email, photoURL, token }, });


});

export const login = tryCatch(async (req, res) => {
    const { email, password } = req.body;
    const emailLowerCase = email.toLowerCase();
    const existedUser = await User.findOne({ email: emailLowerCase });
    if (!existedUser) return res.status(404).json({ success: false, message: "User does not exist" });
    const correctPassword = await bcrypt.compare(password, existedUser.password);
    if (!correctPassword) return res.status(400).json({ success: false, message: 'Invalid credentials' });

    const { _id: id, name, photoURL } = existedUser;
    const token = jwt.sign({ id, photoURL }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.status(200).json({ success: true, result: { id, email: emailLowerCase, photoURL, token }, });

});

// export const updateProfile = tryCatch(async (req, res) => {

//     const updatedUser = await User.findByIdAndUpdate(req.user.id, req.user.body, { new: true });
//     const { _id: id, name, photoURL } = updatedUser;

//     const token = jwt.sign({ id, photoURL }, process.env.JWT_SECRET, { expiresIn: '1h' });
//     res.status(200).json({ success: true, result: { name, photoURL, token } });
// })

export const updateProfile = tryCatch(async (req, res) => {
    const { name, photoURL } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
        req.user.id,
        { name, photoURL },
        { new: true }
    );

    if (!updatedUser) {
        return res.status(404).json({ success: false, message: 'User not found' });
    }

    const { _id: id, name: updatedName, photoURL: updatedPhotoURL } = updatedUser;
    const token = jwt.sign({ id, name: updatedName, photoURL: updatedPhotoURL }, process.env.JWT_SECRET, { expiresIn: '1h' });

    res.status(200).json({
        success: true,
        result: { name: updatedName, photoURL: updatedPhotoURL, token }
    });
});

