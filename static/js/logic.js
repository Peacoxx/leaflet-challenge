// Initialize the map and set its view
var myMap = L.map("map").setView([37.7749, -122.4194], 5);

// Add a tile layer to the map
L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "&copy; <a href='https://www.openstreetmap.org/copyright'>OpenStreetMap</a> contributors"
}).addTo(myMap);

// Define the URL to the GeoJSON data
var geojsonUrl = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

// Function to determine marker color based on depth
function getColor(depth) {
    return depth > 90 ? "#d73027" :
           depth > 70 ? "#fc8d59" :
           depth > 50 ? "#fee08b" :
           depth > 30 ? "#d9ef8b" :
           depth > 10 ? "#91cf60" :
                        "#1a9850";
}

// Fetch the GeoJSON data and add it to the map
d3.json(geojsonUrl).then(function(data) {
    L.geoJson(data, {
        pointToLayer: function(feature, latlng) {
            return L.circleMarker(latlng, {
                radius: feature.properties.mag * 4,  // Adjust size based on magnitude
                fillColor: getColor(feature.geometry.coordinates[2]),  // Color based on depth
                color: "#000",
                weight: 1,
                opacity: 1,
                fillOpacity: 0.8
            });
        },
        onEachFeature: function(feature, layer) {
            layer.bindPopup(
                "<h3>" + feature.properties.place + "</h3><hr>" +
                "<p><strong>Magnitude:</strong> " + feature.properties.mag + "</p>" +
                "<p><strong>Depth:</strong> " + feature.geometry.coordinates[2] + " km</p>" +
                "<p><strong>Time:</strong> " + new Date(feature.properties.time) + "</p>"
            );
        }
    }).addTo(myMap);

    // Create a legend control object
    var legend = L.control({ position: "bottomright" });

    // Define the content of the legend
    legend.onAdd = function(map) {
        var div = L.DomUtil.create("div", "info legend"),
            depths = [0, 10, 30, 50, 70, 90],
            labels = [];

        // Loop through depth intervals to generate a label with a colored square for each interval
        for (var i = 0; i < depths.length; i++) {
            div.innerHTML +=
                '<i style="background:' + getColor(depths[i] + 1) + '"></i> ' +
                depths[i] + (depths[i + 1] ? '&ndash;' + depths[i + 1] + ' km<br>' : '+ km');
        }

        return div;
    };

    // Add the legend to the map
    legend.addTo(myMap);
});
