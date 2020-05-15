/*eslint no-unused-vars: 0*/
function show (secret) {
	return secret.split(" ").map(function (bin) {
		return String.fromCharCode(parseInt(bin, 2));
	}).toString().replace(/,/g, "");
}

function secret () {
	console.log("secret: 01101101 01100101 01101111 01110111");
}

secret();