
class LectorDeArchivos {

    constructor() {
        this.compruebaNavegador();
    }

    compruebaNavegador() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            //El navegador soporta el API File
            console.warn("Este navegador soporta el API File");
       } else {
            console.warn("Este navegador soporta el API File");
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
       } 
    }

    calcularTamañoArchivo() {
        var nBytes = 0,
            archivo = document.getElementById("subirArchivo").files[0];
       
        nBytes = archivo.size;
        
        var tipoTexto = /text.*/;
        var tipoJSON = /json.*/;
        var tipoXML = /xml.*/;
        var nombreTipoTamaño="";
        var areaVisualizacionText = document.getElementById("areaTexto");
        var areaVisualizacionJSON = document.getElementById("areaJSON");
        var areaVisualizacionXML = document.getElementById("areaXML");
        areaVisualizacionText.innerText = "";
        areaVisualizacionJSON.innerText = "";
        areaVisualizacionXML.innerText = "";

        nombreTipoTamaño += "<p>Nombre archivo = "+ archivo.name  + " Tamaño: " + archivo.size +" bytes " + " Tipo: " + archivo.type+"</p>" ;

            if (archivo.type.match(tipoXML)) {
                
                var lector = new FileReader();

                lector.readAsText(archivo);

                lector.onload = function (evento) {
                    areaVisualizacionXML.innerText += lector.result;
                }      
                
            } 
        
        document.getElementById("tamaño").innerHTML = nBytes + " bytes";
        document.getElementById("nombres").innerHTML = nombreTipoTamaño;
      }
}

var lda = new LectorDeArchivos();


    
