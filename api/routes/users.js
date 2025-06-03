const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getActiveUsers,
  createUser,
  updateUser,
  deleteUser
} = require('../controllers/usersController.js');

router.get('/', getAllUsers);
router.get('/active', getActiveUsers);
router.post('/', createUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser);

module.exports = router;
