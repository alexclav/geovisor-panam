var mymap, featureList, boroughSearch = [], theaterSearch = [], museumSearch = [];





//mapas base
var basemaps ={
	cartoLight: L.tileLayer("https://cartodb-basemaps-{s}.global.ssl.fastly.net/light_all/{z}/{x}/{y}.png", {
			  maxZoom: 19,
			  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, &copy; <a href="https://cartodb.com/attributions">CartoDB</a>'
			}),
	OMS: L.tileLayer( 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>',
        subdomains: ['a','b','c']
    })


};


/* Single marker cluster layer to hold all clusters */
// var markerClusters = new L.MarkerClusterGroup({
//   spiderfyOnMaxZoom: true,
//   showCoverageOnHover: false,
//   zoomToBoundsOnClick: true,
//   disableClusteringAtZoom: 16
// });

//definicion de mapa
mymap = L.map('map').setView([3.4114696,-76.5233574], 12);
// mymap = L.map("map", {
//   zoom: 12,
//   center: [3.4114696,-76.5233574],
//   layers: [basemaps.cartoLight, cartoLight.OMS, markerClusters, highlight],
//   zoomControl: false,
//   attributionControl: false
// });

//mapa base predeterminado
basemaps.cartoLight.addTo(mymap);


//agrupacion de capas
L.control.groupedLayers(basemaps).addTo(mymap);

// enfoque a elementos
var highlight = L.geoJson(null);
var highlightStyle = {
  stroke: false,
  fillColor: "#00FFFF",
  fillOpacity: 0.7,
  radius: 10
};


//limites cali
var cali = L.geoJson(null, {
  style: function (feature) {
    return {
      color: "black",
      fill: false,
      opacity: 1,
      clickable: false
    };
  },
  onEachFeature: function (feature, layer) {
    // boroughSearch.push({
    //   name: layer.feature.properties.BoroName,
    //   source: "Boroughs",
    //   id: L.stamp(layer),
    //   bounds: layer.getBounds()
    // });
  }
});
$.getJSON("js/data/cali.geojson", function (data) {
  cali.addData(data);
});

cali.addTo(mymap);

//capa de hoteles
var hotelsLayer = L.geoJson(null);
var hotels = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "./img/hotel.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.Hotel,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>ID</th><td>" + feature.properties.id + "</td></tr>" + "<tr><th>Hotel</th><td>" + feature.properties.Hotel + "</td></tr>" + "<tr><th>Dirección</th><td>" + feature.properties.Direccion + "</td></tr>" + "<tr><th>Zona</th><td>" + feature.properties.Zona + "</td></tr>" + "<tr><th>x</th><td>" + feature.properties.x + "</td></tr>" + "<tr><th>y</th><td>" + feature.properties.y + "</td></tr>" +"<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.Hotel);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="img/hotel.png"></td><td class="feature-name">' + layer.feature.properties.Hotel + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      // museumSearch.push({
      //   name: layer.feature.properties.NAME,
      //   address: layer.feature.properties.ADRESS1,
      //   source: "Museums",
      //   id: L.stamp(layer),
      //   lat: layer.feature.geometry.coordinates[1],
      //   lng: layer.feature.geometry.coordinates[0]
      // });
    }
  }
});
$.getJSON("js/data/hoteles.geojson", function (data) {
  hotels.addData(data);
});

hotels.addTo(mymap);

//capa de centros deportivos
var fieldsLayer = L.geoJson(null);
var fields = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "./img/mascota.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.name,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>ID</th><td>" + feature.properties.num + "</td></tr>" + "<tr><th>Escenario Deportivo</th><td>" + feature.properties.name + "</td></tr>" + "<tr><th>Dirección</th><td>" + feature.properties.direccion + "</td></tr>"  + "</td></tr>" + "<tr><th>x</th><td>" + feature.properties.x + "</td></tr>" + "<tr><th>y</th><td>" + feature.properties.y + "</td></tr>" +"<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.name);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="./img/mascota.png"></td><td class="feature-name">' + layer.feature.properties.name + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      // museumSearch.push({
      //   name: layer.feature.properties.NAME,
      //   address: layer.feature.properties.ADRESS1,
      //   source: "Museums",
      //   id: L.stamp(layer),
      //   lat: layer.feature.geometry.coordinates[1],
      //   lng: layer.feature.geometry.coordinates[0]
      // });
    }
  }
});
$.getJSON("js/data/centros.geojson", function (data) {
  fields.addData(data);
});

fields.addTo(mymap);


//capa de sitios turisticos
var poiLayer = L.geoJson(null);
var poi = L.geoJson(null, {
  pointToLayer: function (feature, latlng) {
    return L.marker(latlng, {
      icon: L.icon({
        iconUrl: "./img/sitio.png",
        iconSize: [24, 28],
        iconAnchor: [12, 28],
        popupAnchor: [0, -25]
      }),
      title: feature.properties.NOMBRE,
      riseOnHover: true
    });
  },
  onEachFeature: function (feature, layer) {
    if (feature.properties) {
      var content = "<table class='table table-striped table-bordered table-condensed'>" + "<tr><th>Sitio Turístico</th><td>" + feature.properties.NOMBRE +  "<tr><th>x</th><td>" + feature.properties.x + "</td></tr>" + "<tr><th>y</th><td>" + feature.properties.y + "</td></tr>" +"<table>";
      layer.on({
        click: function (e) {
          $("#feature-title").html(feature.properties.NOMBRE);
          $("#feature-info").html(content);
          $("#featureModal").modal("show");
          highlight.clearLayers().addLayer(L.circleMarker([feature.geometry.coordinates[1], feature.geometry.coordinates[0]], highlightStyle));
        }
      });
      $("#feature-list tbody").append('<tr class="feature-row" id="' + L.stamp(layer) + '" lat="' + layer.getLatLng().lat + '" lng="' + layer.getLatLng().lng + '"><td style="vertical-align: middle;"><img width="16" height="18" src="img/sitio.png"></td><td class="feature-name">' + layer.feature.properties.NOMBRE + '</td><td style="vertical-align: middle;"><i class="fa fa-chevron-right pull-right"></i></td></tr>');
      // museumSearch.push({
      //   name: layer.feature.properties.NAME,
      //   address: layer.feature.properties.ADRESS1,
      //   source: "Museums",
      //   id: L.stamp(layer),
      //   lat: layer.feature.geometry.coordinates[1],
      //   lng: layer.feature.geometry.coordinates[0]
      // });
    }
  }
});
$.getJSON("js/data/turisticos.geojson", function (data) {
  poi.addData(data);
});

poi.addTo(mymap);



