"use strict"
class CalculadoraCientifica extends Calculadora{

    constructor(){
        super();
    }

    borrarUno(){
        var l = document.getElementById("texto").value.length;
        if(l > 0){
            document.getElementById("texto").value = document.getElementById("texto").value.substring(0,l-1);
        }
        
    }

    cambioSigno(){
        if(document.getElementById("texto").value.length > 0) {
            if(document.getElementById("texto").value.charAt(0)== '-'){
                document.getElementById("texto").value = document.getElementById("texto").value.substring(1);
            } else {
                document.getElementById("texto").value = '-' + document.getElementById("texto").value
            }
        }
    }

    factorial(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = this.calculaFact(parseInt(document.getElementById("texto").value));
        }
    }

    calculaFact(num)
{
    var rval=1;
    for (var i = 2; i <= num; i++)
        rval = rval * i;
    return rval;
}

    numeroPi(){
        document.getElementById("texto").value += Math.PI.toString();
    }
    
    numeroE(){
        document.getElementById("texto").value += Math.E.toString();
    }

    raiz(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.sqrt(parseFloat(document.getElementById("texto").value)).toString();
        } 
    }

    logaritmo(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.log(parseFloat(document.getElementById("texto").value)).toString();
        }
    }

    exponencial(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.exp(parseFloat(document.getElementById("texto").value)).toString();
        }
    }

    vAbsoluto(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.abs(parseFloat(document.getElementById("texto").value)).toString();
        }
    }

    inverso(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = (1/parseFloat(document.getElementById("texto").value)).toString();
        }
    }

    cuadrado(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.pow(parseFloat(document.getElementById("texto").value),2).toString();
        }
    }

    potencia2(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.pow(2,parseFloat(document.getElementById("texto").value)).toString();
        }
    }

    potencia10(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.pow(10,parseFloat(document.getElementById("texto").value)).toString();
        }
    }

    seno(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.sin(parseFloat(document.getElementById("texto").value)).toString();
        }
    }

    coseno(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.cos(parseFloat(document.getElementById("texto").value)).toString();
        }
    }

    tangente(){
        if(document.getElementById("texto").value.length > 0) {
            document.getElementById("texto").value = Math.tan(parseFloat(document.getElementById("texto").value)).toString();
        }
    }


}

var calc = new CalculadoraCientifica();
