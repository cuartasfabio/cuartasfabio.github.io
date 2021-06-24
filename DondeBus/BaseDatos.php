<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    class BaseDatos {
        const SERVERNAME = "localhost";
        const USERNAME = "DBUSER2020";
        const PASSWORD = "DBPSWD2020";
        const DATABASE = "dondebus";
        
        public function __construct() {
        }

        public function buscarParadaMasCercana() {
            $db = new mysqli(self::SERVERNAME,self::USERNAME,self::PASSWORD,self::DATABASE);

            $latitudUsuario = (isset($_GET['lat']))?$_GET['lat']:'';
            $longitudUsuario = (isset($_GET['long']))?$_GET['long']:'';

           if($db->connect_error) {
               exit ("<p>ERROR de conexión:".$db->connect_error."</p>");  
           } else {}
 
           //CONSULTA =>    Seleccionar las paradas de una línea(?). De esas, mostrar la más cercana al usuario.
            $consultaPre = $db->prepare("SELECT * FROM paradaLinea as pl, parada as p WHERE pl.id_parada = p.id and pl.id_linea = ?");   
        
            $consultaPre->bind_param('s', $_GET["id_linea"]);    

            $consultaPre->execute();

            $resultado = $consultaPre->get_result();

            if ($resultado->fetch_assoc()!=NULL) {
                
                $resultado->data_seek(0); 
                $distanciaMinima = 10000;
                $filaMinima;
                while($fila = $resultado->fetch_assoc()) {
                    //mirar distancia al usuario
                    $distancia = $this->calcularDistancia($latitudUsuario,$longitudUsuario,$fila["latitud"],$fila["longitud"]);
                    $distancia = round($distancia * 1000);
                    if($distancia <= $distanciaMinima) {
                        $distanciaMinima = $distancia;
                        $filaMinima = $fila;
                    }     
                }   
                echo "<p>La parada más cercana de esta línea es: <strong>". $filaMinima["nombre"] ."</strong><br>A una distancia de <strong>" . $distanciaMinima . " metros</strong></p>";            
            } else {}

            $consultaPre->close();
            $db->close(); 
        }

        public function mostrarParadasLinea() {
            $db = new mysqli(self::SERVERNAME,self::USERNAME,self::PASSWORD,self::DATABASE);

            if($db->connect_error) {
                exit ("<p>ERROR de conexión:".$db->connect_error."</p>");  
            } else {}
 
            
            $consultaPre = $db->prepare("SELECT * FROM paradaLinea as pl, parada as p WHERE pl.id_parada = p.id and pl.id_linea = ?");   
        
            $consultaPre->bind_param('s', $_GET["id_linea"]);    

            $consultaPre->execute();

            $resultado = $consultaPre->get_result();

            if ($resultado->fetch_assoc()!=NULL) {
                
                $resultado->data_seek(0); 
                echo "<ul>";
                while($fila = $resultado->fetch_assoc()) {
                    echo "<li>"
                        . "<div class='line-llegadas' id='parada-" . $fila["id_parada"] . "'>" 
                            . "<div class= 'list-item-llegada'> <span>" 
                                . "Parada " . (strval($fila["orden"])+1) . " | " . $fila["nombre"] 
                            . "</span> </div>" 
                        . "</div>"
                    . "</li>";      
                }   
                echo "</ul>";        
            } else {}

            $consultaPre->close();
            $db->close(); 
        }

        private function calcularDistancia($lat1, $long1, $lat2, $long2) {
            $longitud1 = deg2rad($long1);
            $longitud2 = deg2rad($long2);
            $latitud1 = deg2rad($lat1);
            $latitud2 = deg2rad($lat2);
             
            //Formula Haversina
            $difLongitud = $longitud2 - $longitud1;
            $difLatitud = $latitud2 - $latitud1;
                
            $valor = pow(sin($difLatitud/2),2)+cos($latitud1)*cos($latitud2)*pow(sin($difLongitud/2),2);
                
            $resultado = 2 * asin(sqrt($valor));
                
            $radio = 6371; //Terrestre en metros
                
            return ($resultado*$radio);
        }

    }
    $bd = new BaseDatos();
?>