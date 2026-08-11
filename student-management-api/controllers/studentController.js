const students = require("../data/students")

const getAllStudents = (req, res) => {
    const data = students

    res.status(200).json({
        success: true,
        message:"Response sent",
        students
    })
}

const getStudentById = (req, res) => {
    const student = students.find(s => s.id === parseInt(req.params.id))

    if (!student) {
        return res.status(404).json({
            success: false,
            message: "ID not found"
        })
    }

    res.status(200).json({
        success: true,
        message: "Response Sent...",
        student
    })
}

const createStudent = (req, res) => {
    const newStudentId = students[students.length - 1].id + 1
    const { name, email, age, gpa, status } = req.body
    
    const newStudent = {
        id: newStudentId,
        name,
        email,
        age,
        gpa,
        status
    }

    students.push(newStudent);

    res.status(201).json({
        success: true,
        message: "New student added",
        students
    })

}

const updateStudentId = (req, res) => {
    const { name, email, age, gpa, status } = req.body
    const ID = parseInt(req.params.id)
    const student = students.find(s => s.id === ID)

    if (!student) {
        res.status(404).json({
            success: false,
            message: "ID not found"
        })
        return
    }
    
    student.name = name || student.name
    student.email = email || student.email
    student.age = age || student.age
    student.gpa = gpa || student.gpa
    student.status = status || student.status

    res.status(200).json({
        success: true,
        message: `Student ${ID} updated...`,
        student: students[studentIndex]
    })
}

const deleteStudent = (req, res) => {
    const Id = parseInt(req.params.id)
    const studentIndex = students.findIndex(s => s.id === Id)
    const student = students[studentIndex]

    if(!student) {
        res.status(404).json({
            success: false,
            message: "ID not found"
        })
        return
    }

    students.splice(studentIndex, 1)

    res.status(200).json({
        success: true,
        message:  `Student ${Id} updated...`,
        students
    })
}

const filterStudents = (req,res, next) => {
    let result = students
    const {name, status} = req.query

    try {
        if(name){
        result = result.filter(s => s.name.toLowerCase() === name.toLowerCase())
    }
        if(status) {
            result = result.filter(s => s.status === status)
        }

        if (result.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Student not found...",
            })
        }

        res.status(200).json({
            success: true,
            message: "Students filtered...",
            result
        })
    }
    catch (error) {
        next(error)
    }
}
const getStudentStats = (req, res, next) => {
    try {
        const total = students.length;

        if (total === 0) {
            return res.status(200).json({
                success: true,
                data: {
                    total: 0,
                    averageGpa: 0
                }
            });
        }

        const totalGpa = students.reduce((sum, student) => sum + student.gpa, 0);
        const averageGpa = totalGpa / total;

        res.status(200).json({
            success: true,
            message: "Student statistics calculated...",
            data: {
                total,
                averageGpa: Number(averageGpa.toFixed(2))
            }
        });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getAllStudents,
    getStudentById,
    createStudent,
    updateStudentId,
    deleteStudent,
    filterStudents,
    getStudentStats
}