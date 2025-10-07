/**
 * Users Routes ( Users.js )
 */

const express = require('express');
const router = express.Router();
const UsersController = require('../controllers/UsersController');
const authMiddleware = require('../middlewares/authMiddleware');


router.post(
  "/",
  authMiddleware,
  
  UsersController.create
);
router.get('/',authMiddleware, UsersController.getAll);
router.get('/:id',authMiddleware, UsersController.getById);
router.put(
  "/:id",
  authMiddleware,
  UsersController.updateById
);
router.delete('/:id',authMiddleware, UsersController.deleteById);

router.get("/suggestions/get", UsersController.getSuggestions);

module.exports = router;
