function downloadSecret (req, res) {
	const item = req.params.download;
	if (item === "hellocat.gif") {
		res.download("./public/images/8VPNV2H.gif", "hellocat.gif");
	} else {
		res.redirect("/secret/cats");
	}
}

module.exports = downloadSecret;