"use strict"
class CalculadoraUnits {

    constructor(){
        this.conversiones = new Array(8);
        this.conversiones[0] = new Array(1, 0.1, 0.001, 0.000001, 0.03937, 0.003281, 0.0010936, 0.0000006214);
        this.conversiones[1] = new Array(10, 1, 0.01, 0.00001, 0.3937, 0.03281, 0.010936, 0.000006214);
        this.conversiones[2] = new Array(1000, 100, 1, 0.001, 39.37, 3.281, 1.0936, 0.0006214);
        this.conversiones[3] = new Array(1000000, 100000, 1000, 1, 39370, 3281, 1093.6, 0.6214);
        this.conversiones[4] = new Array(25.4, 2.54, 0.0254, 0.0000254, 1, 0.08333, 0.02778, 0.000015783);
        this.conversiones[5] = new Array(304.8, 30.48, 0.3048, 0.0003048, 12, 1, 0.33333, 0.0001894);
        this.conversiones[6] = new Array(914.4, 91.44, 0.9144, 0.0009144, 36, 3, 1, 0.0005682);
        this.conversiones[7] = new Array(1609344, 160934, 1609.3, 1.6093, 63360, 5280, 1760, 1);
    }

    borrar(){
        document.getElementById("texto1").value = ""; 
        document.getElementById("texto2").value = "";
    }

    borrarUno(){
        var l = document.getElementById("texto1").value.length;
        if(l > 0){
            document.getElementById("texto1").value = document.getElementById("texto1").value.substring(0,l-1);
            this.actualizar();
        }
    }
    
    insertarToken(n){
        document.getElementById("texto1").value += n;

        this.actualizar();
    }

    actualizar(){
        var num1 = document.getElementById("texto1").value;
        var num2 = 0.0;

        var cb1 = document.getElementById("cb1").selectedIndex;
        var cb2 = document.getElementById("cb2").selectedIndex;

        num2 = num1 * this.conversiones[cb1][cb2];

        num2 = Math.round(num2 * 1000000) / 1000000;

        document.getElementById("texto2").value = num2;

    }

}

var calc = new CalculadoraUnits();
