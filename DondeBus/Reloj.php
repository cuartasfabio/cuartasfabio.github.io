<?php

    error_reporting(E_ALL);
    ini_set('display_errors', 1);

    class Reloj {
        
        public function __construct() {
        }

        

        public function getFechaYHora() {
            date_default_timezone_set('Europe/Madrid');
            $date = date('d-m-Y H:i:s', time());
            return $date;
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
    $reloj = new Reloj();
?>