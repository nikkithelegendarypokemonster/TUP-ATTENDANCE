const express = require('express');
const logController = require('../controllers/logController');
const authController = require('../controllers/authController');

const router = express.Router();

router.route('/absent/:id/:date').get(logController.getLogAbsent);

router
  .route('/')
  .get(authController.protect, logController.getAllLogs)
  .post(authController.protect, logController.createLog);

router
  .route('/:id')
  .get(authController.protect, logController.getLog)
  .patch(authController.protect, logController.updateLog)
  .delete(authController.protect, logController.deleteLog);

module.exports = router;

//FIXME:
// 127.0.0.1:3000/api/v1/logs/?fields=department,college,campus,isAdmin,isPartTime

//FIXME:
// A.) Issue to Fixed B.) Overtime C.) Set as issue D.) Set as absent

//FIXME:
// A.) Issue to Fixed B.) Overtime C.) Set as issue D.) Set as absent
