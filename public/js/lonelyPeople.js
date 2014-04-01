function initialize() {
  var mapOptions = {
    zoom : 4,
    center : new google.maps.LatLng(48.5091823, 30.5670165),
    mapTypeId : google.maps.MapTypeId.ROADMAP,
    styles : gmStyle,
    panControl: false,
    scaleControl: false,
    mapTypeControl: false,
    streetViewControl: false
  };
  var map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  var oms = new OverlappingMarkerSpiderfier(map);
  var infoWindow = null;
  var markers = [];

  function getCard(tweet){
    var profile = "<img src='"+tweet.user.profile_image_url+"'/>";
    var time = moment(tweet.created_at).fromNow();

    return "<div style='float:left; padding-right:20px'>"
      + profile 
      + "</div><div class='tweet' style='padding-top:5px'>" 
      + "<b>" + tweet.user.name + "</b> &mdash; "
      + tweet.tweet 
      + "<small>&nbsp;&mdash;&nbsp;" 
      + time 
      + "</small></div>";
  }
  
  oms.addListener('click', function(marker, e){
    infoWindow.setContent(marker.getTitle());
    infoWindow.open(map, marker);
    $('.tweet').linkify();
  });
  
  for (var i = 0; i < data.length; ++i) {
    var markerColor = "#FF0066";
    if(data[i].entities !== undefined){
      markerColor = "#6600FF";
    }
    
    var marker = new google.maps.Marker({
      position : new google.maps.LatLng(data[i].coordinates[1], data[i].coordinates[0]),
      map : map,
      title : getCard(data[i]),
      icon : {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 4,
        strokeOpacity: 0.5,
        strokeColor: markerColor
      }
    });
    
    infoWindow = new google.maps.InfoWindow({maxWidth:600});
    markers.push(marker);
    oms.addMarker(marker);
  }

  var markerCluster = new MarkerClusterer(map, markers,{
    gridSize : 40,
    zoomOnClick : true,
    avarageCenter : false,
    maxZoom : 13
  });      

}

google.maps.event.addDomListener(window, 'load', initialize);
