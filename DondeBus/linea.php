<!DOCTYPE html>
<html lang="es">
    <head>
        <meta charset="UTF-8"/>
        <meta name="viewport" content="width=device-width">
        <meta name="Author" content="Fabio"/>
        <title>Donde Bus? - Detalle de línea</title>
        <link rel="stylesheet" type="text/css" href="estilo.css"/>
        <link rel="stylesheet" type="text/css" href="posicionamiento.css" />
        <link rel="stylesheet" href="https://fonts.googleapis.com/css?family=Roboto">
        <script src="http://ajax.googleapis.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
        <script src="Geolocalizador.js"></script>
    </head>

    <body>
        <!-- Datos con el contenido que aparece en el navegador -->
        <nav class="navbar">
            <img alt = "Icono-web" src = "multimedia/img/DB_icon.png" class="responsive-logo" />
            <ul class="navbar-list">
                <li class="list-item"><a href="index.html">Inicio</a></li>
                    <li class="list-item"><hr class="vertical-hr"></li>
                <li class="list-item"><a href="mapa.html">Mapa</a></li>
                    <li class="list-item"><hr class="vertical-hr"></li>
                <li class="list-item"><a href="exportar.html">Exportar datos</a></li>
            </ul>
        </nav>

        <main class="main-mapa">
            <?php
                if(isset($_GET['id_linea'])) {
                    echo "<h1>Detalle línea ".$_GET['id_linea']."</h1>";
                }
            ?>
            <button class="btn-map boton-vert" onclick="geoloc.getCoords()">Compartir coordenadas</button>
            <?php require_once "BaseDatos.php";
                if(isset($_GET['long']) && isset($_GET['lat'])) {
                    $bd->buscarParadaMasCercana();
                }

                if(isset($_GET['id_linea'])) {
                    echo "<img class='img-linea' src='multimedia/img/lineas/".$_GET['id_linea'].".png' alt='plano línea 1'/>";
                }
            ?>
        </main>

        <footer class = "footer">
            <nav class="navbar">
                <a href="https://validator.w3.org/check?uri=referer">
                    <img src="multimedia/img/HTML5.png" 
                    alt=" HTML5 Válido!" height="31" width="31" />
                </a>
                <a href="https://jigsaw.w3.org/css-validator/check/referer">
                    <img src="multimedia/img/CSS3.png"
                    alt="CSS Válido" height="31" width="23" />
                </a>
                    <hr class="vertical-hr">
                <ul class="navbar-list">
                    <li class="list-item"><a href="about.html">Más sobre Donde Bus?</a></li>
                        <li class="list-item"><hr class="vertical-hr"></li>
                    <li class="list-item"><a href="tutorial.html">Tutorial de uso</a></li>
                </ul>
            </nav>
        </footer>

    </body>
</html>