const products = require("../data/products")

const getAllProducts = (req, res) => {
    let results = [...products];
    const { id, name, search, price, quantity, category, limit } = req.query;

    if (id) {
        results = results.filter((p) => p.id === Number(id));
    }

    if (name) {
        results = results.filter((p) => 
            p.name?.toLowerCase() === name.toLowerCase().trim()
        );
    } else if (search) {
        results = results.filter((p) => 
            p.name?.toLowerCase().includes(search.toLowerCase().trim())
        );
    }

    if (price) {
        results = results.filter((p) => p.price === Number(price));
    }

    if (quantity) {
        results = results.filter((p) => p.quantity === Number(quantity));
    }

    if (category) {
        results = results.filter((p) => 
            p.category?.toLowerCase() === category.toLowerCase().trim()
        );
    }

    if (limit) {
        const parsedLimit = parseInt(limit, 10);
        if (!isNaN(parsedLimit) && parsedLimit > 0) {
            results = results.slice(0, parsedLimit);
        }
    }

    res.status(200).json({
        success: true,
        count: results.length,
        data: results
    });
};

const getProductByID = (req, res) => {
  
    const productId = parseInt(req.params.id);

    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({
        success: false,
        message: `Product with ID ${productId} not found`
        });
    }

    res.status(200).json({
        success: true,
        data: product
    });
};

const addProduct = (req, res) => {
    const { name, price, quantity, category } = req.body;

    const newProduct = {
        id: products.length + 1, 
        name: name,
        price: price,
        quantity: quantity,
        category: category
    };

    products.push(newProduct);
    
    res.status(201).json({
        success: true,
        data: newProduct
    });
};

const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);

    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
        return res.status(404).json({
            success: false,
            message: `Product with ID ${productId} not found`
        });
    }

    products.splice(index, 1);

    res.status(200).json({
        success: true,
        message: `Product ${productId} deleted successfully`
    });
};

const updateProduct = (req,res) => {
    
    const updateProductId = parseInt(req.params.id)

    let product = products.find((p) => p.id === updateProductId);

    if(!product) {
        return  res.status(404).json({
            success: false,
            message: `Product with id number ${updateProductId} not found`
        })
       
    }

    product.name = req.body.name || product.name;
    product.price = req.body.price || product.price;
    product.quantity = req.body.quantity || product.quantity;
    product.category = req.body.category || product.category;

    res.status(200).json({
        success: true,
        message: `Product ${updateProductId} updated succesfully`
    })
}


module.exports = {
  getAllProducts,
  getProductByID,
  addProduct,
  updateProduct,
  deleteProduct
};