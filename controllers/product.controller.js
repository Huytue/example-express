//var db = require('../db');
var Product = require('../models/product.model');

module.exports.index = async function (req, res) {
	var page = parseInt(req.query.page) || 1; // n
	var perPage = 3;
	var drop = (page - 1) * perPage;
	var products = await Product.find();
	var numberPage = await Product.estimatedDocumentCount()/perPage;
	console.log(numberPage);
	var start = 0;
	var productsPerPage = await Product.find(null, null,{skip: drop}).limit(perPage);
	res.render('products/index', {
		products: productsPerPage,
		page: page,
		total: numberPage,
		start: start
	});

	// var page = parseInt(req.query.page) || 1; // n
	// var perPage = 8;
	// var numberPage = db.get('products').size().value() / perPage;
	// var totalPage = (numberPage);
	// var temp = 0;
	
	// // var start = (page - 1) * perPage;
	// // var end = page * perPage;

	// var drop = (page - 1) * perPage;
	// let sessionId = req.signedCookies.sessionId;
	// res.locals.countCart = db.get("sessions").find({ id: sessionId }).get("cart").size().value();

	// res.render("products/index", {
	// 	//products: db.get("products").value().slice(start, end),
	// 	products: db.get("products").drop(drop).take(perPage).value(),
	// 	page: page,
	// 	temp: temp,
	// 	cart: res.locals.countCart,
	// 	totalPage: totalPage
	// });
};

module.exports.search = async function (req, res) {
	// Loc cac phan tu co tu khoa q
	var q = req.query.q;

	var products = await Product.find();
	matchedProducts = products.filter(function (product) {
		return product.name.toLowerCase().indexOf(q.toLowerCase()) !== -1;
	});
	var page = parseInt(req.query.page) || 1; // n
	var perPage = 3;
	var start = (page - 1) * perPage;
	var end = page * perPage;
	var begin = 0;
	
	//link goc
	var baseUrl = '?q=' + q +'\&';
	res.render('products/index', {
		products: matchedProducts.slice(start, end),
		keyWord: q,
		page:page,
		baseUrl: baseUrl,
		begin: begin
	})
}