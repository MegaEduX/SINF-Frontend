String.prototype.replaceAll = function(search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};

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
			$("#changeLevelConfirm #accessLevelName").val(levelName);
			$("#changeLevelConfirm #accessUserId").val(id);
			
			$("#changeLevelConfirm").modal();
		});
	});

	$("#changeLevelConfirm .modal-footer .btn-success").click(function() {
		var id = $("#changeLevelConfirm #accessUserId").val();
		var levelNum = $("#changeLevelConfirm #accessLevelNum").val();
		var levelName = $("#changeLevelConfirm #accessLevelName").val();
		var token = getCookie("access_token");
		if (!token || !id || !levelNum || !levelName) {
			console.log("something is missing");
			return;
		}

		$.ajax({
		    url: '/api/users/' + id + '?access_token='+token,
		    type: 'PUT',
		    data: {role: {code: levelNum, name: levelName}},
		    success: function(data) {
		        // Do something with the result
		        console.log(data);
		    }
		});
		$("#changeLevelConfirm").toggle();
	});

	// create new user
	$("#btnCreateUser").click(function(e) {
		e.preventDefault();
		$("#newUserModal").modal();
	});
	$("#btnConfirmNewUser").click(function(e) {
		console.log("confirm new users");
		e.preventDefault();
		var username = $("#userName").val();
		var password = $("#password").val();
		
		var accessContainer = $("#level").siblings(".select-control");
		
		var accessName = accessContainer.find(".filter-option").text(); 
		var accessLevel = accessContainer.find(".dropdown-menu").find(".selected").data("original-index");
		
		var name = $("#name").val();
		var surname = $("#surname").val();

		var token = getCookie("access_token");
		if (!token) {
			console.log("something is missing");
			return;
		}
		$.ajax({
		    url: '/api/users?access_token='+token,
		    type: 'POST',
		    data: {username: username, name: name, surname: surname, password: password, role: {name: accessName, code: accessLevel}},
		    success: function(data) {
		        console.log(data);
		        window.location.reload();
		    },
		    error: function(err) {
		    	console.log("error");
		    	console.log(err);
		    	$("#newUserModal").toggle();
		    }
		});
	});

	// show modal for deleting a user
	$(".btn-delete-user").click(function(e) {
        e.preventDefault();
        $("#deletedUserId").val($(this).data("user-id"));
        console.log($(this).data("user-name"));
        $("#deletedUserName").html(" " + $(this).data("user-name"));
        $("#deleteConfirmModal").modal();
    });

    // delete user
    $("#btnConfirmDeleting").click(function(e) {
    	e.preventDefault();
        var id = $("#deletedUserId").val();
        id = id.replaceAll('"', '');
        console.log(id);
    	var token = getCookie("access_token");
		if (!token || !id) {
			console.log("something is missing");
			return;
		}
		console.log(token);
        console.log('/api/users/' + id + '?access_token='+token);
        $.ajax({
            url: '/api/users/' + id + '?access_token='+token,
            type: 'DELETE',

            success: function(data) {
                console.log(data);
                window.location.reload();
            },
            error: function(err) {
                console.log("error");
                console.log(err);
            }
        });
    });
});
