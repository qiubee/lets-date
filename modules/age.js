const getWeekNumber = require("./week-number");

function calculateAge (year, weeknumber) {
	if (!year || !weeknumber) {
		throw new Error("Invalid arguments");
	}
	const currentYear = new Date().getFullYear();
	const currentWeek = getWeekNumber();
	if (currentWeek < weeknumber) {
		return (currentYear - year) - 1;
	} else {
		return (currentYear - year);
	}
}

exports.getAge = calculateAge;