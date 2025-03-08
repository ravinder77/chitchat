export function formatMessage(date) {

	const inputDate = new Date(date);
	const today = new Date();

	const isToday = inputDate.toDateString() === today.toDateString();
	const isYesterday = inputDate.toDateString() === today.toDateString() - 1;


	return new Date(date).toLocaleString('en-US', {
		hour: '2-digit',
		minute: '2-digit',
		hour12: false,
		weekday: isToday ? 'long' : isYesterday ? 'long' : 'short',
	});
 }