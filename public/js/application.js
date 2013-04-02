$('.tooltip-test').tooltip();

// twitter init

$.ajax({
	  type: "GET",
	  url: "twitter"
	}).done(function( data ) {
		$("#twitter-loading").remove();
		$("#twitter-stream").prepend(data);
	});

    
// lastfm init
   

$.ajax({
	  type: "GET",
	  url: "lastfm/stream"
	}).done( function( data ) {
	
		$("#lastfm-loading").remove();
		$("#lastfm-stream").prepend(data);
		var time = moment.unix( $("#utc-time").text() ).fromNow();
		$("#utc-time").html("Listened &#151; " + time);
	});
