$(document).ready(function() {
    $('[name="addButton"]').each(function(index, obj) {
		var docId = window.location.href.split("/");

		docId = docId[docId.length - 1];

		if (existsInCartCookie(docId, $(obj).attr('id')))
			obj.hide();
	});
});
