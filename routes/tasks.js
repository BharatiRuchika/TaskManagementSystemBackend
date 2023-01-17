var express = require('express');
var router = express.Router();
var task = require("../module/tasks")
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/add',task.addTask);
router.get('/get',task.getTasks);
router.get('/get/:id',task.getTask);
router.put('/edit/:id',task.editTask)
router.delete('/delete/:id',task.deleteTask)


module.exports = router;
