const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getActiveUsers,
  createUser,
  findUserByEmail,
  updateUser,
  deleteUser
} = require('../controllers/usersController.js');

router.get('/', getAllUsers);
router.get('/active', getActiveUsers);
router.post('/', createUser);
router.post('/find', findUserByEmail);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
