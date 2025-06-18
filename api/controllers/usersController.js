const User = require('../data/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getActiveUsers = async (req, res) => {
  const active = await User.find({ active: true });
  res.json(active);
};

const createUser = async (req, res) => {
  try {
    const { name, email, password, active } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Ya existe un usuario con ese email' });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword, active });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    if (error.code === 11000) {
      return res.status(409).json({ error: 'El email ya está registrado' });
    }
    if (error.name === 'ValidationError') {
      return res.status(400).json({ error: error.message });
    }
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

    const match = await bcrypt.compare(password, user.password);

    if (!match) return res.status(401).json({ error: 'Usuario o contraseñas invalidas. Intente nuevamente' });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: 'Error al iniciar sesión' });
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;
  const updatedUser = await User.findByIdAndUpdate(id, req.body, { new: true });
  if (!updatedUser) return res.status(404).json({ error: 'Usuario no encontrado' });
  res.json(updatedUser);
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  await User.findByIdAndDelete(id);
  res.json({ message: 'Usuario eliminado correctamente' });
};

module.exports = {
  getAllUsers,
  getActiveUsers,
  createUser,
  loginUser,
  updateUser,
  deleteUser
};