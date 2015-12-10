$(document).ready(function() {
	// datatable setup
	$('.datatable').DataTable({
		bLengthChange: false,
		columnDefs: [
   			{ width: 130, orderable: false, searchable: false, targets: -1 }
		],
		responsive: true,
		oLanguage: {
    		sSearch: '<span class="glyphicon glyphicon-search"></span>'
  		}
	});
	
	// tooltips
	$('[data-toggle="tooltip"]').tooltip();

	// datetime picker
	$('#datetimepicker').datetimepicker({
		format: "DD.MM.YYYY.",
		defaultDate: new Date()
	});

	// login button workaround
	// should be replaced with something smarter
	$("#loginBtn").click(function(e) {
		e.preventDefault();
		var username = $("#username").val();
		var pass = $("#password").val();
		$.post( "/api/auth/login", $( "#loginForm" ).serialize(), function() {
		}).success(function(data) {
			if (data.token != undefined) {
				document.cookie = 'access_token='+data.token;
				window.location = "/";
			}
		}); 
	});

	$("#logoutBtn").click(function(e) {
		e.preventDefault();
		document.cookie= 'access_token=';
		window.location = "/login";
	});

	$(".select-control").selectpicker();

} );