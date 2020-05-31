// get current week number: http://zerosixthree.se/snippets/get-week-of-the-year-with-jquery/

module.exports = function getWeekNumber () {
	const firstDayOfYear = new Date(new Date().getFullYear(), 0,1);
	return Math.round((((new Date() - firstDayOfYear) / 86400000) + firstDayOfYear.getDay()+1)/7);
};