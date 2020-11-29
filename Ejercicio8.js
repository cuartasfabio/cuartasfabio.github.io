"use strict";
class Meteo {
    constructor(){
        this.apikey = "5b416507c3663e26eafdffbaa93eeb6c";
        this.unidades = "&units=metric";
        this.idioma = "&lang=es";
        this.url = "";
        this.correcto = "¡Todo correcto! JSON recibido de <a href='http://openweathermap.org'>OpenWeatherMap</a>"
    }
    cargarDatos(){
        $.ajax({
            dataType: "json",
            url: this.url,
            method: 'GET',
            success: function(datos){
                    $("pre").text(JSON.stringify(datos, null, 2));
                    
                    var stringDatos = "<ul><li>Ciudad: " + datos.name + "</li>";
                        stringDatos += "<li>País: " + datos.sys.country + "</li>";
                        stringDatos += "<li>Latitud: " + datos.coord.lat + " grados</li>";
                        stringDatos += "<li>Longitud: " + datos.coord.lon + " grados</li>";
                        stringDatos += "<li>Temperatura: " + datos.main.temp + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura máxima: " + datos.main.temp_max + " grados Celsius</li>";
                        stringDatos += "<li>Temperatura mí­nima: " + datos.main.temp_min + " grados Celsius</li>";
                        stringDatos += "<li>Presión: " + datos.main.pressure + " milibares</li>";
                        stringDatos += "<li>Humedad: " + datos.main.humidity + " %</li>";
                        stringDatos += "<li>Amanece a las: " + new Date(datos.sys.sunrise *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Oscurece a las: " + new Date(datos.sys.sunset *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Dirección del viento: " + datos.wind.deg + " grados</li>";
                        stringDatos += "<li>Velocidad del viento: " + datos.wind.speed + " metros/segundo</li>";
                        stringDatos += "<li>Hora de la medida: " + new Date(datos.dt *1000).toLocaleTimeString() + "</li>";
                        stringDatos += "<li>Fecha de la medida: " + new Date(datos.dt *1000).toLocaleDateString() + "</li>";
                        stringDatos += "<li>Descripción: " + datos.weather[0].description + "</li>";
                        stringDatos += "<li>Visibilidad: " + datos.visibility + " metros</li>";
                        stringDatos += "<li>Nubosidad: " + datos.clouds.all + " %</li>";
                        stringDatos += "<li>Representación gráfica:</li></ul>";
                        stringDatos += "<img src='http://openweathermap.org/img/w/"+ datos.weather[0].icon+".png' alt='Weather icon'>";
                    
                    $("p").html(stringDatos);
                },
            error:function(){
                $("h3").html("¡Tenemos problemas! No puedo obtener JSON de <a href='http://openweathermap.org'>OpenWeatherMap</a>"); 
                $("h4").remove();
                $("pre").remove();
                $("p").remove();
                }
        });
    }
    crearElemento(tipoElemento, texto, insertarAntesDe){
        var elemento = document.createElement(tipoElemento); 
        elemento.innerHTML = texto;
        $(insertarAntesDe).before(elemento);
    }
    verJSON(ciudad,pais){
        $("h2").remove();
        $("h3").remove();
        $("h4").remove();
        $("pre").remove();
        $("p").remove();
        this.url = "http://api.openweathermap.org/data/2.5/weather?q=" + ciudad + "," + pais + this.unidades + this.idioma + "&APPID=" + this.apikey;
        this.crearElemento("h2","Datos en JSON desde <a href='http://openweathermap.org'>OpenWeatherMap</a>","footer"); 
        this.crearElemento("h3",this.correcto,"footer"); 
        this.crearElemento("h4","JSON","footer");        
        this.crearElemento("pre","","footer"); 
        this.crearElemento("h4","Datos","footer"); 
        this.crearElemento("p","","footer"); 
        this.cargarDatos();
        $(this).attr("disabled","disabled");
    }
}
var meteo = new Meteo();
