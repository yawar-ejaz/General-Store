const express = require("express")
const router = express.Router();

const { getProducts, addProduct, deleteProduct, decreaseQuantity} = require('../controllers/userControllers');

router.route("/").get(getProducts);
// router.route("/:id").get(getParticularAppointment)
router.route("/").post(addProduct);
router.route("/:id/:decreaseBy").put(decreaseQuantity);
router.route("/:id").delete(deleteProduct);

module.exports = router;