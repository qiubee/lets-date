function randomCatGIF () {
	const giphyDomain = "https://giphy.com/gifs/";
	const cats = ["cat-hello-oh-MWSRkVoNaC30A", "jerseydemic-3oriO0OEd9QIDdllqo", "cat-sup-whats-up-onOWJOc7U5GAE", "funny-cat-mlvseq9yvZhba"];
	const index = Math.floor(Math.random() * cats.length);
	return giphyDomain + cats[index];
}

function cats (req, res) {
	const item = req.params.item;
	console.log(item);
	switch (true) {
	case /cats?/g.test(item): {
		const catGIF = randomCatGIF();
		const gifID = catGIF.split("-").pop();
		const catGIFembed = "https://giphy.com/embed/" + gifID;
		return res.render("cat", {
			layout: "dark",
			title: "Look, here's a cat",
			hellocat: gifID === "MWSRkVoNaC30A" ? true : false,
			gifembed: catGIFembed,
			gif: catGIF
		});
	}
	default:
		res.redirect("/oops");
	}
}

module.exports = cats;