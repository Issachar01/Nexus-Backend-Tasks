const express = require("express");
const router = express.Router();
const {
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
} = require('../controllers/productController');

router.get('/category/:category', getProductsByCategory);
router.get('/price/:price', getProductsUnderPrice);
router.get('/low-stock', getLowStockProducts);
router.get('/value', getTotalInventoryValue);

router.get('/', getAllProducts);
router.get('/:id', getProductByID);
router.post('/', validateProduct, addProduct);
router.put('/:id', validateProduct, updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;