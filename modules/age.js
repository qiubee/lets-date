const getWeekNumber = require("./week-number");

module.exports = function calculateAge (year, weeknumber = 1) {
	if (!year || typeof year !== "number") {
		throw new Error("Invalid argument");
	}
	const currentYear = new Date().getFullYear();
	const currentWeek = getWeekNumber();
	if (currentWeek < weeknumber) {
		return (currentYear - year) - 1;
	} else {
		return (currentYear - year);
	}
};