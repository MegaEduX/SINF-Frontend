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
function checkConfirmBtn() {
	//if all items are done, enabled confirm
	if ($("#pickingTable .btn-success").length > 0) {
		$(".btn-confirm-picking").attr("disabled", true);
	} else {
		$(".btn-confirm-picking").attr("disabled", false);
	}
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

	var routeTable = $("#routePickingTable");
	if (routeTable.length > 0) {
		// item status update
		var routeId = window.location.pathname.split("/")[2];
		$.ajax({
			url: "/api/routes/" + routeId,
			type: "GET",
			success: function(returnData) {
				var route = JSON.parse(JSON.stringify(returnData));
				var items = route.objects;
				var rows = $(".item-id");
				if (route.finished) {
					for (var i = 0; i < items.length; i++) {
						var btn = $(rows[i]).siblings(".action").children("button");
						setBtnToUndo(btn);
						btn.attr("disabled", true);
					}
					$(".btn-confirm-picking").attr("disabled", true);
				} else {
					for (var i = 0; i < items.length; i++) {
						var btn = $(rows[i]).siblings(".action").children("button");
						if (items[i].picked) {
							setBtnToUndo(btn);
						} else {
							setBtnToDone(btn);
						}
					}
					checkConfirmBtn();
				}
			}
		});
	}
	
	$(".btn-done-picking-item").click(function(e) {
		e.preventDefault();
		
		var routeId = window.location.pathname.split("/")[2];
		var item = $(this).parent().siblings(".item-id").text();
		var order = $(this).parent().siblings(".order-id").text();
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
			data: "item=" + item + "&picked=" + picked + "&order=" + order,
			success: function(returnData) {
				console.log(returnData);
			}
		});
		checkConfirmBtn();
		
	});

	$(".btn-confirm-picking").click(function(e) {
		$("#pickingConfirm").modal();
	});
	$("#btnConfirmPicking").click(function(e) {
		$.ajax({
			url: "/api/routes/" + routeId,
			type: "PUT",
			data: "finished=true",
			success: function(returnData) {
				window.location.reload();
			},
			error: function(err) {
				console.log(err);
				
			}
		});
	});
});
