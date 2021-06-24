"use strict";
class Geolocalizador {

    

    constructor(){}

    getCoords() {

        var options = {
            enableHighAccuracy: false,
            timeout: 5000,
            maximumAge: 0
        };

        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(this.crearBotonCoords,this.errorLocalizacion,options);
          } else { 
            $("h1").prepend("<p>Geolocation no soportada por el navegador</p>");
          } 
    }

    crearBotonCoords(position) {
        var longitud = position.coords.longitude;
        var latitud = position.coords.latitude;
        //obtener línea actual
        var linea = $("h1").text();
        linea = linea.split(" ")[2];
        
        //ocultar boton localizar
        $("button").hide();
        //mostrar boton buscar parada
        var boton = '<button class="btn-map boton-vert" onclick="location.href=\'linea.php?id_linea='+ linea + '&lat=' + latitud + '&long=' + longitud +'\'">Obtener parada más cercana</button>';
        $("h1").after(boton);
    }

    errorLocalizacion() {
        console.warn("Se ha producido un error al intentar geolocalizar");
    }

    
    
}
var geoloc = new Geolocalizador();
