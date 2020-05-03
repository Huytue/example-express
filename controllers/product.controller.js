var db = require('../db');

module.exports.index = function (req, res) {
	var page = parseInt(req.query.page) || 1; // n
	var perPage = 8;
	var numberPage = db.get('products').size().value() / perPage;
	var totalPage = (numberPage);
	var temp = 0;
	
	var start = (page - 1) * perPage;
	var end = page * perPage;

	var drop = (page - 1) * perPage;
	let sessionId = req.signedCookies.sessionId;
	res.locals.countCart = db.get("sessions").find({ id: sessionId }).get("cart").size().value();

	res.render("products/index", {
		products: db.get("products").value().slice(start, end),
		//products: db.get("products").drop(drop).take(perPage).value(),
		page: page,
		temp: temp,
		start:start,
		end:end,
		cart: res.locals.countCart,
		totalPage: totalPage
	});
};