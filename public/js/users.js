function getCookie(name) {
  var value = "; " + document.cookie;
  var parts = value.split("; " + name + "=");
  if (parts.length == 2) return parts.pop().split(";").shift();
}

$(document).ready(function() {
	$(".select-control").selectpicker();
	$(".user-level-control").each(function() {
		$(this).change(function(e) {
			var tr = $(this).parent().parent();
			var id = tr.children(".idColumn").text();
			var levelName = $(this).find(":selected").text();
			var levelNum = $(this).val();
			var userName = tr.children(".usernameColumn").text();
			
			$("#changeLevelConfirm .access-level").text(levelName);
			$("#changeLevelConfirm .access-user").text(userName);
			$("#changeLevelConfirm #accessLevelNum").val(levelNum);
			$("#changeLevelConfirm #accessUserId").val(id);
			
			$("#changeLevelConfirm").modal();
		});
	});

	$("#changeLevelConfirm .modal-footer .btn-success").click(function() {
		var id = $("#changeLevelConfirm #accessUserId").val();
		var levelNum = $("#changeLevelConfirm #accessLevelNum").val();
		var token = getCookie("access_token");
		if (!token || !id || !levelNum) {
			console.log("something is missing");
			return;
		}
		console.log(id);

		$.ajax({
		    url: '/api/users/' + id + '?access_token='+token,
		    type: 'PUT',
		    data: {level: levelNum},
		    success: function(data) {
		        // Do something with the result
		        console.log(data);
		    }
		});
		$("#changeLevelConfirm").toggle();
	});
});
