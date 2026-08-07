const express = require("express");
const router = express.Router()
const {
  getAllProducts,
  getProductByID,
  addProduct,
  updateProduct,
  deleteProduct
} = require('../controllers/productControllers');

router.get('/', getAllProducts);
router.get('/:id', getProductByID);
router.post('/', addProduct);
router.put('/:id', updateProduct);
router.delete('/:id', deleteProduct);

module.exports = router;