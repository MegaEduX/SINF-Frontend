$(document).ready(function() {
	$("#deleteAll").click(function() {
		deleteCartCookie();
		location.reload();
	});
	// deletes single item from the cart
	$(".btn-delete-single-item").click(function(e) {
		e.preventDefault();
		var item = $(this).parent().prev(".item-code").text();
		removeFromCartCookie(item);
		location.reload();
	});


	$(".btn-done-picking-item").click(function(e) {
		e.preventDefault();
		//design change
		if ($(this).hasClass("btn-success")) {
			
			$(this).removeClass("btn-success");
			$(this).addClass("btn-danger");
			$(this).children(".btn-text").text("Undo");
			
			var glyph = $(this).children(".glyphicon-ok");
			glyph.removeClass("glyphicon-ok");
			glyph.addClass("glyphicon-remove");

		} else if ($(this).hasClass("btn-danger")) {
			
			$(this).removeClass("btn-danger");
			$(this).addClass("btn-success");
			$(this).children(".btn-text").text("Done");
			
			var glyph = $(this).children(".glyphicon-remove");
			glyph.removeClass("glyphicon-remove");
			glyph.addClass("glyphicon-ok");
		}

		//if all items are done, enabled confirm
		if ($("#pickingTable .btn-success").length > 0) {
			console.log("false");
			$(".btn-confirm-picking").attr("disabled", true);
		} else {
			console.log("true");
			$(".btn-confirm-picking").attr("disabled", false);
		}
	});
});
