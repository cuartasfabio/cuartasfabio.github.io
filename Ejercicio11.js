
class MapaDinamico {
    constructor(){
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        this.map = L.map('map').setView([43.56845, -5.61401], 9);
        this.marker = "";
        this.hasPosition = false;
        this.configureMap();
    }

    getPosicion(posicion){
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.hasPosition = true;
    }
    verErrores(error){
        switch(error.code) {
        case error.PERMISSION_DENIED:
            this.mensaje = "El usuario no permite la petición de geolocalización"
            break;
        case error.POSITION_UNAVAILABLE:
            this.mensaje = "Información de geolocalización no disponible"
            break;
        case error.TIMEOUT:
            this.mensaje = "La petición de geolocalización ha caducado"
            break;
        case error.UNKNOWN_ERROR:
            this.mensaje = "Se ha producido un error desconocido"
            break;
        }
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

    setUserLocation() {
        if(this.marker == "") {
            this.addPoint(this.latitud, this.longitud); 
        }
    }

    addPoint(lat, lng){
       this.marker = L.marker([lat, lng]).addTo(this.map);
    }
}

var mapa = new MapaDinamico();
