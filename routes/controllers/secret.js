function generateYouTubeLink () {
	const youtubeDomain = "https://www.youtube.com/watch?v=";
	let link = "";
	if (Math.floor(Math.random() * 100) < 90) {
		return "https://youtu.be/dQw4w9WgXcQ?t=43";
	}
	for (let i=0; i < 11; i++) {
		const type = Math.floor(Math.random() * 10);
		if (type < 1) {
			link += randomNumber();
		} else if (type > 1 && type < 6) {
			link += randomLetter();
		} else {
			link += randomLetter(true);
		}
	}
	return youtubeDomain + link;
}

function randomNumber () {
	return String(Math.floor(Math.random() * 10));
}

function randomLetter (capitalized = false) {
	const letters = "abcdefghijklmnopqrstuvwxyz".split("");
	const capitalLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
	const index = Math.floor(Math.random() * letters.length);
	return capitalized ? capitalLetters[index] : letters[index];
}

function secret (req, res) {
	res.send(`<html><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>****</title><style>body{background-color:#1D182E;}p{font-family:Helvetica,Arial,Ubuntu,sans-serif;font-size:1.5em;color:white;}p:first-letter{text-transform:capitalize;}a{color:khaki;font-weight:bold;}</style></head><body><p>shhh, <a href=${generateYouTubeLink()}>here's a secret</a></body></html>`);
}

module.exports = secret;