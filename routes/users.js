const router = require('express').Router();
const { getUsers } = require('../controllers/users');

router.route('/').get((req, res, next) => {
  console.log('middleware');
  next();
}, getUsers);

module.exports = router;
