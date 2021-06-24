"use strict";
class Llegadas {

    constructor(){}

    consultaJSONLlegadas(linea) {
        //hace peticion al json
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4) {
                //cuando la peticion termina, comprueba su estado
                if(ajaxRequest.status == 200) {
                    var json = JSON.parse(ajaxRequest.responseText);
                    var posiciones = json.posiciones.posicion;
                    var llegadas = json.llegadas.llegada;
                    // buscar todos los autobuses en la línea
                    for(var i = 0; i < posiciones.length; i++) {
                        // posiciones[i].idsiguienteparada != 0 ----> el autobús NO está fuera de servicio
                        if(posiciones[i].idlinea == linea && posiciones[i].idsiguienteparada != 0) {
                            
                            // de cada uno buscar sus llegadas en la linea
                            for(var j = 0; j < llegadas.length; j++) {
                                if(llegadas[j].idautobus == posiciones[i].idautobus) {

                                    // de cada llegada, buscar la parada en el documento
                                    if($("#parada-" + llegadas[j].idparada).length && llegadas[j].minutos > 0) {

                                        // añadirle info (minutos, distancia)
                                        $("#parada-" + llegadas[j].idparada + ":first-child").append(
                                            "<div class= 'list-item-llegada'>" + "<span> " + llegadas[j].minutos 
                                            + "min para bus " + llegadas[j].idautobus + "</span></div>"
                                        );
                                    }
                                }
                            }
                        }
                    }
                    // mostrar la posicion actual de los buses
                    for(var i = 0; i < posiciones.length; i++) {
                        // posiciones[i].idsiguienteparada != 0 ----> el autobús NO está fuera de servicio
                        if(posiciones[i].idlinea == linea && posiciones[i].idsiguienteparada != 0) {
                            // marcar el bus en la parada que se halle en el momento
                            if($("#parada-" + posiciones[i].idparada).length) {
                                $("#parada-" + posiciones[i].idparada).before(
                                    "<div class='list-item-llegada'>" + 
                                    "<img class='icono-bus' src='multimedia/img/bus.png' alt='icono bus'/>"
                                     + "<span> " + posiciones[i].idautobus + "</span></div>"
                                );
                            }
                        }
                    }

                } else {
                    console.log("Status error: " + ajaxRequest.status);
                }
            }
        }
        ajaxRequest.open("GET", "https://datos.gijon.es/doc/transporte/busgijontr.json", true);
        ajaxRequest.send();
    }

    esportarXMLLlegadas(linea) {
        //hace peticion al json
        var ajaxRequest = new XMLHttpRequest();
        ajaxRequest.onreadystatechange = function(){
            if(ajaxRequest.readyState == 4) {
                //cuando la peticion termina, comprueba su estado
                if(ajaxRequest.status == 200) {
                    //json de respuesta
                    var json = JSON.parse(ajaxRequest.responseText);
                    //guardar posiciones de la linea
                    var posiciones = json.posiciones.posicion;
                    var posicionesLinea = [];
                    for(var i = 0; i < posiciones.length; i++) {
                        if(posiciones[i].idlinea == linea && posiciones[i].idsiguienteparada != 0) {
                            posicionesLinea.push(posiciones[i]);
                        }
                    }
                    //empezar a construir xml
                    var xml = '<?xml version="1.0" encoding="UTF-8"?>\n<linea nombre="linea' + linea + '">\n\t<buses>\n';
                    for(var i = 0; i < posicionesLinea.length; i++) {
                        xml += "\t\t<bus>\n";
                        xml += "\t\t\t<matricula>" + posicionesLinea[i].matricula + "</matricula>\n";
                        xml += "\t\t\t<modelo>" + posicionesLinea[i].modelo + "</modelo>\n";
                        xml += "\t\t\t<parada>" + posicionesLinea[i].idparada + "</parada>\n";
                        xml += "\t\t\t<minutos>" + posicionesLinea[i].minutos + "</minutos>\n";
                        xml += "\t\t\t<proximaparada>" + posicionesLinea[i].idsiguienteparada + "</proximaparada>\n";
                        xml += "\t\t</bus>\n";
                    }
                    //fin del xml
                    xml += "\t</buses>\n</linea>";
                    //parsear a xml
                    var parser = new DOMParser();
                    var xmlDoc = parser.parseFromString(xml,"text/xml");
                    //descargar el archivo xml
                    var filename = "posicion_buses_linea_"+linea;
                    var pom = document.createElement('a');
                    pom.setAttribute('href', 'data:text/xml;charset=utf-8,' + encodeURIComponent(xml));
                    pom.setAttribute('download', filename);
                
                    if (document.createEvent) {
                        var event = document.createEvent('MouseEvents');
                        event.initEvent('click', true, true);
                        pom.dispatchEvent(event);
                    }
                    else {
                        pom.click();
                    }
                        } else {
                            console.log("Status error: " + ajaxRequest.status);
                        }
                    }
        }
        ajaxRequest.open("GET", "https://datos.gijon.es/doc/transporte/busgijontr.json", true);
        ajaxRequest.send();
    }

}
var llegadas = new Llegadas();

