"use strict"
class CalculadoraRPN {

    constructor(){
        this.stack = new Array();
    }

    pushNumber(n){
        this.stack.push(n)
        this.showStack()
    }

    popNumber(){
        var r = this.stack.pop();
        this.showStack();
        return r;
    }

    showStack(){
        var stringStack = "";
        var count = this.stack.length;
        for (var i in this.stack){
            stringStack += count + ": " + this.stack[i] +"\n";
            count -= 1;
        }
        document.getElementById("stack").value = stringStack;
    }

    enter(){
        var str = document.getElementById("texto2").value;
        var patt = new RegExp("[+-]?([0-9]*[.])?[0-9]+");
        if(!patt.test(str)){
            document.getElementById("texto2").value = "Formato de número incorrecto!";
        } else {
            this.pushNumber(parseFloat(str));
            document.getElementById("texto2").value = "";
        }
        
    }

    borrar(){
        document.getElementById("texto2").value = ""; 
    }

    borrarStack(){
        this.stack = new Array();
        this.showStack();
    }

    borrarUno(){
        var l = document.getElementById("texto2").value.length;
        if(l > 0){
            document.getElementById("texto2").value = document.getElementById("texto2").value.substring(0,l-1);
        }
    }

    cuadrado(){
        var num = this.popNumber();
        this.pushNumber(Math.pow(num,2));
    }
    seno(){
        var num = this.popNumber();
        this.pushNumber(Math.sin(num));
    }
    coseno(){
        var num = this.popNumber();
        this.pushNumber(Math.cos(num));
    }
    tangente(){
        var num = this.popNumber();
        this.pushNumber(Math.tan(num));
    }
    
    insertarToken(n){
        document.getElementById("texto2").value += n;
    }

    dividir(){
        var sum2 = this.popNumber();
        var sum1 = this.popNumber();
        this.pushNumber(sum1/sum2);
    }
    multiplicar(){
        var sum2 = this.popNumber();
        var sum1 = this.popNumber();
        this.pushNumber(sum1*sum2);
    }
    sumar(){
       
        try {
            var sum2 = this.popNumber();
            var sum1 = this.popNumber();
            this.pushNumber(sum1+sum2);
        } catch(err) {
            document.getElementById("texto2").value = "No hay suficientes parámetros!";
        }
        
    }
    restar(){
        var sum2 = this.popNumber();
        var sum1 = this.popNumber();
        this.pushNumber(sum1-sum2);
    }



}

var calc = new CalculadoraRPN();
