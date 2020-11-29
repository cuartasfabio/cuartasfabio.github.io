"use strict";
class Fotos {
    constructor(){}

    buscar(){
        var busqueda = document.getElementById('texto').value;;
        var flickrAPI = "http://api.flickr.com/services/feeds/photos_public.gne?jsoncallback=?";
        $.getJSON(flickrAPI, 
                {
                    tags: busqueda,
                    tagmode: "any",
                    format: "json"
                })
            .done(function(data) {
                    $.each(data.items, function(i,item ) {
                        $("<img>").attr( "src", item.media.m).appendTo( "#imagenes" );
                        if ( i === 20 ) {
                                return false;
                                }
                    });
        }); 
    }
}
var fotos = new Fotos();