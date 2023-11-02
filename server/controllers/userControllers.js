const Products = require('../models/products');

const getProducts = async (req, res, next) => {
    try {
        const result = await Products.findAll({
            order: [["createdAt", "ASC"]]
        });
        res.status(200).json(result)
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to fetch products from database!"
        })
        console.log("failed to fetch products from database. " + error)
    }
}

const addProduct = async (req, res, next) => {
    const { name, price, desc, quantity } = req.body;
    try {
        await Products.create({
            name,
            price,
            desc,
            quantity
        });
        res.status(201).json({
            success: true,
            message: "Product added successfully!"
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to add product to the database!"
        });
        console.log("failed to add product to the database. " + error);
    }
}

const decreaseQuantity = async (req, res, next) => {
    const id = req.params.id;
    const decreaseBy = req.params.decreaseBy;
    if (!id) {
        console.log("No id provided");
    }
    else {
        try {
            const product = await Products.findByPk(id);
            if (product.quantity >= decreaseBy) {
                await Products.update({
                    quantity: product.quantity - decreaseBy
                },
                    {
                        where: {
                            _id: id
                        }
                    });
                return res.status(200).json({
                    success: true,
                    message: "Value updated successfully"
                });
            }
        } catch (err) {
            console.log(err);
        }
    }
}

const deleteProduct = async (req, res, next) => {
    const id = req.params.id;
    if (!id) {
        console.log("No id provided");
    }
    else {
        try {
            await Products.destroy({
                where: {
                    _id: id
                }
            });
            return res.status(200).json({
                success: true,
                message: "Product deleted successfully"
            })
        } catch (err) {
            console.log(err);
            return res.status(500).json({
                success: false,
                message: "Product not deleted"
            });
        };
    }
}

module.exports = {
    addProduct,
    getProducts,
    deleteProduct,
    decreaseQuantity,
};