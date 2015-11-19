$(document).ready(function() {
	$('.datatable').DataTable({
		bLengthChange: false,
		columnDefs: [
   			{ width: 130, orderable: false, searchable: false, targets: -1 }
		],
		responsive: true
	});
	
	// search input fixes
	$(".dataTables_filter").html($(".dataTables_filter").html().replace("Search:", ""));
	$(".dataTables_filter").html($(".dataTables_filter").html() + '<span class="glyphicon glyphicon-search"></span>');
	
	// tooltips
	$('[data-toggle="tooltip"]').tooltip()

	// datetime picker
	$('#datetimepicker').datetimepicker({
		format: "DD.MM.YYYY.",
		defaultDate: new Date()
	});
} );