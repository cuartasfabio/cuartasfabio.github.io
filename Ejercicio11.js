
class MapaDinamico {
    constructor(){
        this.map = L.map('map').setView([43.56845, -5.61401], 9);
    }
   

    configureMap(){
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=9EW2N6SK9fg3opHcOASa',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true
      }).addTo(this.map);
    }

    addPoint(lat, lng){
        L.marker([lat, lng]).addTo(this.map);
    }
}

var mapa = new MapaDinamico();
mapa.configureMap();
mapa.addPoint(43.545025, -5.662557);