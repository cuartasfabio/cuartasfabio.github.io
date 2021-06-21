"use strict";
class Parser {

    constructor(){}

    cargarDatos(){
        var xhttp = new XMLHttpRequest();
        xhttp.onreadystatechange = function() {
            if (this.readyState == 4 && this.status == 200) {
                console.log(this);
            }
        };
        xhttp.open("GET", "https://docs.gijon.es/sw/busgijon.asmx/Paradas", true);
        xhttp.send();
    }

    verXML(){
        this.cargarDatos();
    }
}
var parser = new Parser();
