const express = require('express');
const { addEmployees, deleteEmployee, getEmployees, updateEmployee } = require('../controllers/db');
const router = express.Router();

router.post('/addEmployee', addEmployees); 
router.get('/getEmployees', getEmployees); 
router.put('/updateEmployee/:id', updateEmployee); 
router.delete('/deleteEmployee/:id', deleteEmployee); 

module.exports = router;
