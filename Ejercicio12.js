
class LectorDeArchivos {

    constructor() {
        this.compruebaNavegador();
    }

    compruebaNavegador() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            //El navegador soporta el API File
            document.write("<p>Este navegador soporta el API File </p>");
       } else {
           document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
       } 
    }

    calcularTamañoArchivos() {
        var nBytes = 0,
            archivos = document.getElementById("subirArchivos").files,
            nArchivos = archivos.length;
        for (var i = 0; i < nArchivos; i++) {
          nBytes += archivos[i].size;
        }
        var tipoTexto = /text.*/;
        var tipoJSON = /json.*/;
        var tipoXML = /xml.*/;
        var nombresTiposTamaños="";
        var areaVisualizacionText = document.getElementById("areaTexto");
        var areaVisualizacionJSON = document.getElementById("areaJSON");
        var areaVisualizacionXML = document.getElementById("areaXML");
        areaVisualizacionText.innerText = "";
        areaVisualizacionJSON.innerText = "";
        areaVisualizacionXML.innerText = "";

        for (var x = 0; x < nArchivos; x++) {

            nombresTiposTamaños += "<p>Archivo[" + x +"] = "+ archivos[x].name  + " Tamaño: " + archivos[x].size +" bytes " + " Tipo: " + archivos[x].type+"</p>" ;
            
        }

        for (var i = 0; i < nArchivos; i++) {

            if (archivos[i].type.match(tipoTexto)) {
                
                var lector = new FileReader();

                lector.readAsText(archivos[i]);

                lector.onload = function (evento) {
                    areaVisualizacionText.innerText += "\n\nContenido["+i+"] = "+lector.result;
                }      
                
            
            } 
            
        }
        
        document.getElementById("numero").innerHTML = nArchivos;
        document.getElementById("tamaño").innerHTML = nBytes + " bytes";
        document.getElementById("nombres").innerHTML = nombresTiposTamaños;
      }
}

var lda = new LectorDeArchivos();


    
