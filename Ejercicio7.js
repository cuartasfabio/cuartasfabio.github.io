$(document).ready(function(){
    $("#ocultar").click(function(){
      $("p").hide();
      $("ul").hide();
    });
    $("#mostrar").click(function(){
      $("p").show();
      $("ul").show();
    });
    $("#modificar").click(function(){
      $("#parrafo1").text("Se debe escribir un código JavaScript usando jQuery que permita:");
      $("#punto1").text("Ocultar y mostrar algunos de los elementos del HTML");
      $("#punto2").text("Modificar algunos de los elementos HTML");
      $("#punto3").text("Añadir nuevos elementos HTML");
    });
    $("#añadir").click(function(){
      $("#punto3").after("<li id='punto4'>Sumar las filas y columnas de la tabla.</li>");
      $("#punto3").after("<li id='punto4'>Recorrer todos los elementos HTML y mostrar de cada uno de ellos: quien es su elemento padre y que tipo de elemento es.</li>");
      $("#punto3").after("<li id='punto4'>Eliminar algunos de los elementos HTML.</li>");
    });
    $("#vaciar").click(function(){
      $("#punto1").remove();
      $("#punto2").remove();
      $("#punto3").remove();
      $("#punto4").remove();
      $("#punto4").remove();
      $("#punto4").remove();
    });
    $("#detalleMas").click(function() {
      $("*", document.body).each(function() {
        var etiquetaPadre = $(this).parent().get(0).tagName;
        $(this).after(document.createTextNode( "Etiqueta padre : <" 
           + etiquetaPadre + ">\nTipo de elemento : <" 
           + $(this).get(0).tagName +">"));
      });
    });
    $('#ocultar1').click(function() {
      $("table tr td").each(function() {
          var celda = $.trim($(this).text());
          if (celda.length == 0) {
              $(this).parent().hide();
          }
      });
  });
  $('#mostrar1').click(function() {
      $("table tr").each(function() {
          $(this).show();
      });
  });
});