$(document).ready(function() {
	// build table from cookie

	$('[name="addButton"]').each(function(index, obj) {
		var docId = window.location.href.split("/");

		docId = docId[docId.length];

		if (existsInCartCookie(docId, $(obj).attr('id')))
			obj.hide();
	});
});
