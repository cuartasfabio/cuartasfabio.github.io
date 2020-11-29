"use strict"
class Calculadora {

    constructor(){
        this.memory = 0;
    }

    insertarToken(t){
        document.getElementById("texto").value += t;
    }

    mrc(){
        if(this.memory != 0){
            document.getElementById("texto").value = this.memory;
        } else if(this.memory == parseInt(document.getElementById("texto").value)){
            this.memory = 0;
        }
    }

    mMenos(){
        this.memory += parseInt(document.getElementById("texto").value)
    }

    mMas(){
        this.memory += parseInt(document.getElementById("texto").value)
    }

    borrar(){
        document.getElementById("texto").value = "";
    }

    igual(){
        var x;
        x = document.getElementById("texto").value;
        try { 
            document.getElementById("texto").value = eval(x);
        }
        catch(err) {
            document.getElementById("texto").value = "Error de sintaxis!";
        }  
    }
}

var calc = new Calculadora();
