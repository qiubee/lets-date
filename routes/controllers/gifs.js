function randomCatGIF () {
	const giphyDomain = "https://giphy.com/gifs/";
	const cats = ["cat-hello-oh-MWSRkVoNaC30A", "jerseydemic-3oriO0OEd9QIDdllqo", "cat-sup-whats-up-onOWJOc7U5GAE", "aww-11s7Ke7jcNxCHS", "cat-hello-hey-VOPK1BqsMEJRS", "cat-loop-running-10SqrGYtLNcNWw"];
	const index = Math.floor(Math.random() * cats.length);
	return giphyDomain + cats[index];
}

function generateNonce () {
	// generate random strings: https://gist.github.com/6174/6062387
	return Math.random().toString(31).substring(4, 14) + Math.random().toString(21).substring(2, 9);
}

function cats (req, res) {
	const item = req.params.item;
	console.log(item);
	switch (true) {
	case /cats?/g.test(item): {
		const catGIFsrc = randomCatGIF();
		const gifID = catGIFsrc.split("-").pop();
		const catGIF = "https://media.giphy.com/media/" + gifID + "/source.gif";
		const nonce = generateNonce();
		res.setHeader("Content-Security-Policy", "script-src 'self', script-src 'nonce-" + nonce + "';");
		return res.render("cat", {
			layout: "dark",
			title: "Look, here's a cat",
			hellocat: gifID === "MWSRkVoNaC30A" ? true : false,
			gifsrc: catGIFsrc,
			gif: catGIF,
			randomString: nonce
		});
	}
	default:
		res.redirect("/oops");
	}
}

module.exports = cats;