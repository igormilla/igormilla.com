exports.index = function(req, res){
	
	var data = {};
	data.title = 'Igor Milla';
	res.render('index', data);
};
