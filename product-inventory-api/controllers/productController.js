const products = require("../data/products");

const validateProduct = (req, res, next) => {
    const { name, price, quantity, category } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
        return res.status(400).json({
            message: "Validation failed"
        });
    }

    if (!name || typeof name !== "string" || name.trim() === "") {
        return res.status(400).json({
            message: "Validation failed"
        });
    }

    if (price === undefined || typeof price !== "number" || price <= 0) {
        return res.status(400).json({
            message: "Validation failed"
        });
    }

    if (quantity === undefined || typeof quantity !== "number" || quantity < 0) {
        return res.status(400).json({
            message: "Validation failed"
        });
    }

    if (!category || typeof category !== "string" || category.trim() === "") {
        return res.status(400).json({
            message: "Validation failed"
        });
    }

    next();
};

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

    res.status(200).json(results);
};

const getProductByID = (req, res) => {
    const productId = parseInt(req.params.id);
    const product = products.find((p) => p.id === productId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.status(200).json(product);
};

const addProduct = (req, res) => {
    const { name, price, quantity, category } = req.body;

    const newProduct = {
        id: products.length > 0 ? products[products.length - 1].id + 1 : 1, 
        name: name.trim(),
        price: price,
        quantity: quantity,
        category: category.trim()
    };

    products.push(newProduct);
    
    res.status(201).json(newProduct);
};

const deleteProduct = (req, res) => {
    const productId = parseInt(req.params.id);
    const index = products.findIndex((p) => p.id === productId);

    if (index === -1) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(index, 1);

    res.status(200).json({
        message: "Product deleted successfully"
    });
};

const updateProduct = (req, res) => {
    const updateProductId = parseInt(req.params.id);
    let product = products.find((p) => p.id === updateProductId);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const { name, price, quantity, category } = req.body;

    product.name = name !== undefined ? name.trim() : product.name;
    product.price = price !== undefined ? price : product.price;
    product.quantity = quantity !== undefined ? quantity : product.quantity;
    product.category = category !== undefined ? category.trim() : product.category;

    res.status(200).json(product);
};

const getProductsByCategory = (req, res) => {
    const categoryName = req.params.category.toLowerCase().trim();
    const filtered = products.filter(p => p.category.toLowerCase() === categoryName);
    res.status(200).json(filtered);
};

const getProductsUnderPrice = (req, res) => {
    const targetPrice = parseFloat(req.params.price);
    
    if (isNaN(targetPrice)) {
        return res.status(400).json({ message: "Invalid price format" });
    }

    const filtered = products.filter(p => p.price === targetPrice);
    res.status(200).json(filtered);
};

const getLowStockProducts = (req, res) => {
    const filtered = products.filter(p => p.quantity < 5);
    res.status(200).json(filtered);
};

const getTotalInventoryValue = (req, res) => {
    const totalValue = products.reduce((acc, p) => acc + (p.price * p.quantity), 0);
    res.status(200).json({
        totalInventoryValue: totalValue
    });
};

module.exports = {
    getAllProducts,
    getProductByID,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductsByCategory,
    getProductsUnderPrice,
    getLowStockProducts,
    getTotalInventoryValue,
    validateProduct
};