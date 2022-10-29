const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    const { 
        featured,
        name,
        company,
        sort,
        fields,
        numericFilters,
    } = req.query;

    const queryObject = {};
    let sortList = 'createAt';

    if(featured){
        queryObject.featured = featured === true ? true : false
    }

    if(name){
        queryObject.name = { $regex:name, $options: 'i' };
    }

    if(company){
        queryObject.company = company;
    }

    // Numeric Filters
    const operatorMap = {
        '>' : '$gt',
        '>=' : '$gte',
        '=' : '$eq',
        '<' : '$lt',
        '<=' : '$lte'
    }
    const regEx = /\b(<|>|<=|>=|=)\b/g;
    let filters = numericFilters.replace(regEx, (match) => `-${operatorMap[match]}-`);
    const options = ['price', 'rating'];

    filters = filters.split(',').forEach((item) => {
        const [field, operator, value] = item.split('-'); 

        if(options.includes(field)){
            queryObject[field] = {[operator] : Number(value)}
        }
    });

    let results = Product.find(queryObject);

    // Sort
    if(sort){
        sortList = sort.split(',').join(' ');
    }

    results = results.sort(sortList);

    // select fields
    if(fields){
        const fieldsList = fields.split(',').join(' ');
        results = results.select(fieldsList);
    }

    // Pagination
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const skip = (page - 1) * limit;

    results = results.skip(skip).limit(limit);

    const products = await results;

    res.status(200).json({
        products,
        nbHits: products.length
    });
}

const getAllProductsStatic = (req, res) => {
    res.status(200).json({msg: 'messages goes here'});
}

module.exports = {
    getAllProducts,
    getAllProductsStatic
}