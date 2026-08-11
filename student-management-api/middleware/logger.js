const logger = (req,res,next) => {
    const method = req.method
    const url = req.url

    const id = new Date().toISOString()

    console.log(`Request ID ${id} - Method ${method} ${url}`)

    next()

}

module.exports = logger