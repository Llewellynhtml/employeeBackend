const express =  require ("express");
const router = express.Router();
const {addUser, delelteEmp }  =  require('../controllers/db')

router.post('/addUser' , addUser)
router.delete()

module.exports =  router ;

