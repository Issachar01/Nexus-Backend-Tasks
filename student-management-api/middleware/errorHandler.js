const errorHandler = (err, req, res, next) => {
    const error = err.statusCode || 500
    const message = err.message || "Internal server error"

    console.log(`[Error] ${error} - ${message}`)
    res.status(error).json({
        success: false,
        message: message
    })

    
}

module.exports = errorHandler