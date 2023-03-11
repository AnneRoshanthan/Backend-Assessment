const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');
const auth = require('../middleware/auth');
const authAdmin = require('../middleware/authAdmin');
// -------------------------------routes----------------------------------------------------//
router.post('/task',auth,taskController.ceateTask);
router.get('/task/:pageNumber',taskController.getTask);

router.route('/task/:id')
.put(auth,taskController.updateTask)
.patch(auth,taskController.updatePriority)
.delete(auth,taskController.deleteTask)

//Update the status
router.patch('/update-status/:id',auth,taskController.updateStatus);

//List all tasks of the logged in user
router.get('/find-tasks-by-id',auth,taskController.listAllUserTask);

// list all tasks count by periority level
router.get('/all-tasks-admin',taskController.listAllUserWithTaskCount);

module.exports = router;