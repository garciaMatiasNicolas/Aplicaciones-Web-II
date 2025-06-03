const User = require('../data/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const getAllUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};

const getActiveUsers = async (req, res) => {
  const active = await User.find({ active: true });
  res.json(active);
};

const createUser = async (req, res) => {
  const { name, email, password, active } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  const newUser = new User({ name, email, password: hashedPassword, active });
  await newUser.save();
  res.status(201).json(newUser);
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

  const match = await bcrypt.compare(password, user.password);
  if (!match) return res.status(401).json({ error: 'Credenciales inválidas' });

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
  res.json({ token });
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