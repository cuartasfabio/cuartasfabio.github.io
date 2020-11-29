
var map;

class MapaDinamico {
    constructor(){
        map = L.map('map').setView([42.94838, -5.57007], 7);
        this.marker = "";
        this.configureMap();
    }

    configureMap(){
        L.tileLayer('https://api.maptiler.com/maps/streets/{z}/{x}/{y}.png?key=9EW2N6SK9fg3opHcOASa',{
        tileSize: 512,
        zoomOffset: -1,
        minZoom: 1,
        attribution: "\u003ca href=\"https://www.maptiler.com/copyright/\" target=\"_blank\"\u003e\u0026copy; MapTiler\u003c/a\u003e \u003ca href=\"https://www.openstreetmap.org/copyright\" target=\"_blank\"\u003e\u0026copy; OpenStreetMap contributors\u003c/a\u003e",
        crossOrigin: true
      }).addTo(map);
    }

    addPoint(lat, lng){
       this.marker = L.marker([lat, lng]).addTo(map);
    }
}

class CargaArchivo {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
        } else {
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
    }

    leerArchivoTexto(files) 
    { 
        var archivo = files[0];
        var nombre = document.getElementById("nombreArchivo");
        var tamaño = document.getElementById("tamañoArchivo");
        var ultima = document.getElementById("ultimaModificacion");
        nombre.innerText = "Nombre del archivo: " + archivo.name;
        tamaño.innerText = "Tamaño del archivo: " + archivo.size + " bytes"; 
        ultima.innerText = "Fecha de la última modificación: " + archivo.lastModifiedDate;
        
            var lector = new FileReader();
            lector.onload = function (evento) {
                var parser = new DOMParser();
                var xmlDoc = parser.parseFromString(evento.target.result, "text/xml");
                var document = xmlDoc.getElementsByTagName("kml")[0].getElementsByTagName("Document")[0];
                var placeMarks = document.getElementsByTagName("Placemark");
    
                for (var i = 0; i < placeMarks.length; i++) {
                    var coords = document.getElementsByTagName("coordinates")[0].textContent;
                    var coordLines = coords.split("\n");
                    coordLines.shift();
                    coordLines.pop();
    
                    var flightPlanCoordinates = [];
    
                    coordLines.forEach(function (c) {
                        var coordVals = c.split(",");
    
                        var marker = L.marker([parseFloat(coordVals[1]), parseFloat(coordVals[0])]).addTo(map);
                        marker.bindPopup("<b>Esto es un hito!</b><br>Latitud = "+coordVals[1]+"<br>Longitud = "+coordVals[0]).openPopup()
                        
                        flightPlanCoordinates.push({lat: parseFloat(coordVals[1]), lng: parseFloat(coordVals[0])});
                    });
    
                    var line = L.polyline([
                        [coordLines[0].split(",")[1], coordLines[0].split(",")[0]],
                        [coordLines[1].split(",")[1], coordLines[1].split(",")[0]],
                        [coordLines[2].split(",")[1], coordLines[2].split(",")[0]],
                        [coordLines[3].split(",")[1], coordLines[3].split(",")[0]]
                    ]).addTo(map);
 
            }     
            lector.readAsText(archivo);
        }
           
    };
}

var mapa = new MapaDinamico();
var ca = new CargaArchivo();