const countries = ["austria", "belgium", "switzerland", "czech republic", "germany", "denmark", "spain", "finland", "france", "united kingdom", "hungary", "ireland", "italy", "luxembourg", "the netherlands", "norway", "poland", "portugal", "sweden"];
const countrycodes = ["AT", "BE", "CH", "CZ", "DE", "DK", "ES", "FI", "FR", "GB", "HU", "IE", "IT", "LU", "NL", "NO", "PL", "PI", "SE"];

function capitalize (str) {
	return str.charAt(0).toUpperCase() + str.slice(1);
}

function capitalizeAll (str) {
	const arr = str.split(" ");
	return arr.map(function (word) {
		return capitalize(word);
	}).map(function (word, i) {
		if (i === arr.length -1) {
			return word;
		} else {
			return word + " ";
		}
	}).join("");
}

function getCountryName (countryISO) {
	const iso = countryISO.toUpperCase();
	if (iso === "UK" || iso === "uk") {
		return capitalizeAll(countries[9]);
	}
	for (let i=0; i < countrycodes.length; i++) {
		if (countrycodes[i] === iso) {
			const arr = countries[i].split(" ");
			if (arr.length > 1) {
				return capitalizeAll(countries[i]);
			} else {
				return capitalize(countries[i]);
			}
		}
	}
	throw new Error("Country not found");
}

function getCountryISO (countryName) {
	const country = countryName.toLowerCase().replace(/^([tT][hH][eE]) /g, "");
	for (let i=0; i < countries.length; i++) {
		const name = countries[i].replace(/^([tT][hH][eE]) /g, "");
		if (countries[i] === country) {
			return countrycodes[i];
		} else if (name === country) {
			return countrycodes[i];
		}
	}
	throw new Error("ISO code not found");
}

exports.getName = getCountryName;
exports.getISO = getCountryISO;