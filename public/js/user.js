
$(document).ready(function() {

	$("#userInfo #saveChangesBtn").click(function(e) {
		e.preventDefault();
		var id = $("#userInfo #userId").val();
		var name = $("#userInfo #name").val();
		var surname = $("#userInfo #surname").val();
		var token = getCookie("access_token");
		if (!token || !id || !name || !surname) {
			console.log("something is missing");
			return;
		}

		$.ajax({
		    url: '/api/users/' + id + '?access_token='+token,
		    type: 'PUT',
		    data: {name: name, surname: surname},
		    success: function(data) {
		    	//TODO show notice 
		    	window.location = "/";
		    }
		});
	});
});
