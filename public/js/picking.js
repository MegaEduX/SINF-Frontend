$(document).ready(function() {
	$("#deleteAll").click(function() {
		console.log("Clicked delete all.");

		deleteCartCookie();

		location.reload();
	});
});
