function setBtnToUndo(obj) {
	$(obj).removeClass("btn-success");
	$(obj).addClass("btn-danger");
	$(obj).children(".btn-text").text("Undo");
			
	var glyph = $(obj).children(".glyphicon-ok");
	glyph.removeClass("glyphicon-ok");
	glyph.addClass("glyphicon-remove");
}
function setBtnToDone(obj) {
	$(obj).removeClass("btn-danger");
	$(obj).addClass("btn-success");
	$(obj).children(".btn-text").text("Done");
			
	var glyph = $(obj).children(".glyphicon-remove");
	glyph.removeClass("glyphicon-remove");
	glyph.addClass("glyphicon-ok");
}

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
		
		var routeId = window.location.pathname.split("/")[2];
		var item = $(this).parent().siblings(".item-id").text();
		var picked = false;
	
		if ($(this).hasClass("btn-success")) {
			picked = true;
			setBtnToUndo(this);
		} else if ($(this).hasClass("btn-danger")) {
			picked = false;
			setBtnToDone(this);
		}
		$.ajax({
			url: "/api/routes/" + routeId,
			type: "PUT",
			data: "item=" + item + "&picked=" + picked,
			success: function(returnData) {
				console.log(returnData);
			}
		});
		//if all items are done, enabled confirm
		if ($("#pickingTable .btn-success").length > 0) {
			$(".btn-confirm-picking").attr("disabled", true);
		} else {
			$(".btn-confirm-picking").attr("disabled", false);
		}
	});
});
