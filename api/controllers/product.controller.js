var Product = require('../../models/product.model');

// Get all product
module.exports.index = async function (req, res, next) {
	try{
	var products = await Product.find();
		res.json(products);
	}catch(err){
		next(err);
	}
	};

//Get a product with id
module.exports.detail = async function (req, res) {
	var product = await Product.findByIdAndUpdate(req.params.id, req.body);
	res.json(product);
}

//Create a product
module.exports.create = async function (req, res) {
	var product = await Product.create(req.body);
	res.json(product);
}

//Update a product with id
module.exports.update = async function (req, res) {
	var product = await Product.findByIdAndUpdate(req.params.id, req.body);
	res.json(product);
}

//Delete a product with id
module.exports.delete = async function (req, res) {
	var product = await Product.findByIdAndDelete(req.params.id, req.body);
	res.json(product);
}