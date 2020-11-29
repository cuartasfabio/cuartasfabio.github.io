
class CargaArchivo {
    constructor() {
        if (window.File && window.FileReader && window.FileList && window.Blob) {  
            document.write("<p>Este navegador soporta el API File </p>");
        } else {
            document.write("<p>¡¡¡ Este navegador NO soporta el API File y este programa puede no funcionar correctamente !!!</p>");
        }
    }

    leerArchivoVideo(files) { 
        var archivo = files[0];
        var video = document.getElementById("video");
        var archivoURL = URL.createObjectURL(archivo)
        video.src = archivoURL;
    };
}

class Subtitulos {
    
    constructor() {
        this.cargarSubstitulos();
    }

    cargarSubstitulos() {
        var video = document.getElementById("video");
        var track = video.addTextTrack("captions", "English", "en");
        track.mode = "showing";
        track.addCue(new VTTCue(0, 2, "I love you Mr.Bobz, muac muac."));
        track.addCue(new VTTCue(2.5, 3.5, "Do you love me too?"));
        track.addCue(new VTTCue(4, 4.5, "Muac."));
        track.addCue(new VTTCue(5, 7, "No? ... Oh no!"));
        track.addCue(new VTTCue(8, 9, "I think he loves me."));
        track.addCue(new VTTCue(10.5, 12, "Yeah, I got you!"));
        track.addCue(new VTTCue(12, 13.5, "I got this on camera!"));
        track.addCue(new VTTCue(13.7, 14.5, "*Angry noises*"));

        var track = video.addTextTrack("captions", "Spanish", "es");
        track.addCue(new VTTCue(0, 2, "Te quiero Mr.Bobz, muac muac."));
        track.addCue(new VTTCue(2.5, 3.5, "¿Tu también me quieres?"));
        track.addCue(new VTTCue(4, 4.5, "Muac."));
        track.addCue(new VTTCue(5, 7, "No? ... Oh no!"));
        track.addCue(new VTTCue(8, 9, "Creo que me quiere."));
        track.addCue(new VTTCue(10.5, 12, "¡Si, te he pillado!"));
        track.addCue(new VTTCue(12, 13.5, "¡Lo tengo grabado!"));
        track.addCue(new VTTCue(13.7, 14.5, "AAAAAAAAAAAAAAAH"));
    }
}

class FullScreenControl {

    fullscreenOn() {
        var elem = document.getElementById("video");
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        }
    }
}

var ca = new CargaArchivo();
var subs = new Subtitulos();
var fs = new FullScreenControl();