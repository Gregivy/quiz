function $rv(f,arg) {
	this.f = f;
	this.arg = arg;
}

$rv.prototype.get = function () {
	return this.f(this.arg);
}

$rv.prototype.set = function (nf, na) {
	this.f = nf;
	this.arg = na;
}

function $fc (f) {
	return function () {
		return f;
	}
}

module.exports = $rv;