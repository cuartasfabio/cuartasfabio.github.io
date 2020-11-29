class Pokemon {

    constructor(name, type, image){
        this.name = name;
        this.type = type;
        this.image = image;
    }

    getName() {
        return this.name;
    }

    getType() {
        return this.type;
    }

    getImage() {
        return this.image;
    }
}


class MapaPokemon {
    constructor(){
        this.rellenaArrayPokemon();
        navigator.geolocation.getCurrentPosition(this.getPosicion.bind(this), this.verErrores.bind(this));
        this.map = L.map('map').setView([43.56845, -5.61401], 9);
        this.marker = "";
        this.area = "";
        this.hasPosition = false;
        this.configureMap();
    }

    rellenaArrayPokemon() {
        this.pokemones = new Array();
        this.pokemones[0] = new Pokemon('Pikachu', 'Electrico', 'icons/pikachu.png');
        this.pokemones[1] = new Pokemon('Eevee', 'Normal', 'icons/eevee.png');
        this.pokemones[2] = new Pokemon('Ivysayr', 'Planta', 'icons/ivysaur.png');
        this.pokemones[3] = new Pokemon('Charizard', 'Fuego', 'icons/charizard.png');
        this.pokemones[4] = new Pokemon('Snorlax', 'Normal', 'icons/snorlax.png');
        this.pokemones[5] = new Pokemon('Squirtle', 'Agua', 'icons/squirtle.png');
    }

    getPosicion(posicion) {
        this.mensaje = "Se ha realizado correctamente la petición de geolocalización";
        this.longitud         = posicion.coords.longitude; 
        this.latitud          = posicion.coords.latitude;  
        this.hasPosition = true;
    }
    verErrores(error) {
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
            this.paintRadarArea();
        }
    }

    addPoint(lat, lng) {
       var marker = L.marker([lat, lng],{icon:this.buildNewIcon('icons/trainer.png')}).addTo(this.map);
       marker.bindPopup("<b> Jugador </b><br> Un entrenador pokemon.").openPopup();
    }

    addPointPokemon(lat, lng, pokemon) {
        var marker = L.marker([lat, lng],{icon:this.buildNewIcon(pokemon.getImage())}).addTo(this.map);
        marker.bindPopup("<b> Un " + pokemon.getName() +" salvaje! </b><br> Tipo: " + pokemon.getType() + "<br> Latitud: " + lat + "<br> Longitud: " + lng);
     }

    paintRadarArea() {
        this.area = L.circle([this.latitud, this.longitud], {
            color: 'blue',
            fillColor: '#719ae0',
            fillOpacity: 0.25,
            radius: 100
        }).addTo(this.map);
    }

    buildNewIcon(image) {
        var result = L.icon ({
            iconUrl: image,
            iconSize: [50,50],
            iconAnchor: [25,25]
        })
        return result;
    }

    getRandomInt(max) {
        return Math.floor(Math.random() * Math.floor(max));
    }

    getRandomPoint(coord) {
        if(this.getRandomInt(2) == 0) {
            return (coord + this.getRandomInt(10)/10000.0);
        } else {
            return (coord - this.getRandomInt(10)/10000.0);
        }
        
    }

    getRandomPokemon() {
        return this.pokemones[this.getRandomInt(6)];
    }

    placeAPokemon(userLat, userLon) {
        var randomLat = this.getRandomPoint(userLat);
        var randomLon = this.getRandomPoint(userLon);

        var randomPokemon = this.getRandomPokemon();

        this.addPointPokemon(randomLat, randomLon, randomPokemon);
        
    }

    placeRandomPokemones(number) {
        for (let index = 0; index < number; index++) {
            this.placeAPokemon(this.latitud, this.longitud);
        }
    } 

    startGame() {
        this.setUserLocation();
        this.placeRandomPokemones(7);
    }
}

var mapa = new MapaPokemon();
