const express = require("express")
const router = express.Router()

const studentController = require("../controllers/studentController")
const validateStudent = require("../middleware/validateStudent")

router.get("/", studentController.filterStudents)
router.get("/stats", studentController.getStudentStats)
router.get('/:id', studentController.getStudentById)
router.post('/', studentController.createStudent, validateStudent)
router.patch('/:id', studentController.updateStudentId, validateStudent)
router.put('/:id', studentController.updateStudentId, validateStudent)
router.delete('/:id', studentController.deleteStudent)

module.exports = router