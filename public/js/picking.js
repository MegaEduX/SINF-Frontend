$(document).ready(function() {
	$("#deleteAll").click(function() {
		deleteCartCookie();
		location.reload();
	});
	$(".btn-delete-single-item").click(function(e) {
		e.preventDefault();
		var item = $(this).parent().prev(".item-code").text();
		removeFromCartCookie(item);
		location.reload();
	});
});
