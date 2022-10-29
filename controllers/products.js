const getAllProducts = async (req, res) => {
    res.status(200).json({products: 'hello'});
}

const getAllProductsStatic = (req, res) => {
    res.status(200).json({msg: 'messages goes here'});
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}