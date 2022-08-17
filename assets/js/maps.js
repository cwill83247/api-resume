        function initMap() {
        var map = new google.maps.Map(document.getElementById("map"), {          //this is provided by Google - but the map element by id is referncing my map div...  
            zoom:3,
            center: {
                lat: 46.619261,
                lng: -33.134766
            }
        });
        var labels ="ABCDEFGHIJKLM";  //this is to reference the label
        var locations =[   //an array with objects lat and long
        {lat: 40.785091, lng: -73.968285},    //object
        {lat: 41.084045, lng:-73.874245},  //another object with value pairs
        {lat: 40.754932, lng: -73.984016}
        ];    //end of array
        var markers = locations.map(function(location,i) {   //iterate through the array  the map method here is a built in JS method can take upto 3 arguments
        return new google.maps.Marker({
            position:location,
            label: labels[i % labels.length]
        });
        });
        var markerCluster = new MarkerClusterer(map, markers, { imagePath: 'https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m' });    
}
    
