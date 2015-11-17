$(document).ready(function() {
	$('.datatable').DataTable({
		bLengthChange: false,
		columnDefs: [
   			{ width: 130, orderable: false, searchable: false, targets: -1 }
		],
		responsive: true
	});
	$('[data-toggle="tooltip"]').tooltip()
} );