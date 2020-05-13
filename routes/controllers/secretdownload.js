const path = require("path");

function downloadSecret (req, res, next) {
	const item = res.params.download;
	console.log(item);
	if (item === "hellocat.gif") {
		res.sendFile("8VPNV2H.gif", {
			root: path.join(__dirname, "../public")
		});
	}
}

module.exports = downloadSecret;