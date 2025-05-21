const fs = require('fs');
const path = require('path');
const salesDataPath = path.join(__dirname, '../data/sales.json');
const usersDataPath = path.join(__dirname, '../data/users.json');

const getAllUsers = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersDataPath));
  res.json(users);
};

const getActiveUsers = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersDataPath));
  const active = users.filter(u => u.active);
  res.json(active);
};

const createUser = (req, res) => {
  const users = JSON.parse(fs.readFileSync(usersDataPath));
  const newUser = { id: Date.now(), ...req.body };
  users.push(newUser);
  fs.writeFileSync(usersDataPath, JSON.stringify(users, null, 2));
  res.status(201).json(newUser);
};

const findUserByEmail = (req, res) => {
  const { email } = req.body;
  const users = JSON.parse(fs.readFileSync(usersDataPath));
  const user = users.find(u => u.email === email);
  user ? res.json(user) : res.status(404).json({ error: 'User not found' });
};

const updateUser = (req, res) => {
  const { id } = req.params;
  const users = JSON.parse(fs.readFileSync(usersDataPath));
  const index = users.findIndex(u => u.id == id);
  if (index === -1) return res.status(404).json({ error: 'User not found' });
  users[index] = { ...users[index], ...req.body };
  fs.writeFileSync(usersDataPath, JSON.stringify(users, null, 2));
  res.json(users[index]);
};

const deleteUser = (req, res) => {
  const { id } = req.params;
  const users = JSON.parse(fs.readFileSync(usersDataPath));
  const sales = JSON.parse(fs.readFileSync(salesDataPath));
  const hasSales = sales.some(sale => sale.userId == id);
  if (hasSales) {
    return res.status(400).json({ error: 'Cannot delete user with existing sales' });
  }
  const newUsers = users.filter(u => u.id != id);
  fs.writeFileSync(usersDataPath, JSON.stringify(newUsers, null, 2));
  res.json({ message: 'User deleted successfully' });
};

module.exports = {
  getAllUsers,
  getActiveUsers,
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser
};
