const validateStudent = (req, res, next) => {
    const { name, email, age, course, gpa, status} = req.body

    if (!name || !email || !age || !course || !gpa || !status) {
        res.status(400).json({
            success: false,
            message: "Missing required fields"
        })
    }

    if (typeof name !== 'string' || typeof email !== 'string' || typeof course !== 'string') {
        res.status(400).json ({
            success: false,
            message: "Name, email, and course must be valid strings."
        })
    }

    if (typeof age !== 'number' || typeof gpa !== 'number') {
        res.status(400).json ({
            success: false,
            message: "Age and gpa must be valid numbers."
        })
    }

    if (status !== "Active" && status !== "Inactive") {
        return res.status(400).json({
            success: false,
            message: "Status must be strictly 'Active' or 'Inactive'."
        });
    }

    next()
}

module.exports = validateStudent