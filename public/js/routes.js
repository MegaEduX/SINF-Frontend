$.fn.dataTable.moment = function ( format, locale ) {
    var types = $.fn.dataTable.ext.type;
 
    // Add type detection
    types.detect.unshift( function ( d ) {
        return moment( d, format, locale, true ).isValid() ?
            'moment-'+format :
            null;
    } );
 
    // Add sorting method - use an integer for the sorting
    types.order[ 'moment-'+format+'-pre' ] = function ( d ) {
        return moment( d, format, locale, true ).unix();
    };
};
$(document).ready(function() {
    $.fn.dataTable.moment('DD/MM/YYYY hh:mm:ss');
    
    $(".btn-delete-route").click(function(e) {
        e.preventDefault();
        $("#deletedRouteId").val($(this).data("route-id"));
        $("#deleteConfirmModal").modal();
    });
    $("#btnConfirmDeleting").click(function(e) {
        e.preventDefault();
        var id = $("#deletedRouteId").val();
        $.ajax({
            url: '/api/routes/' + id,
            type: 'DELETE',
            success: function(data) {
                // Do something with the result
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
