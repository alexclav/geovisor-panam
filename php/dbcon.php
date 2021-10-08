<?php

function conexion(){
$myServer = "DESKTOP-O9KTC74";
$myUser = "";
$myPass = "";
$myDB = "pruebas";
$con = odbc_connect ( "Driver={SQL Server};Server=$myServer;Database=$myDB" , $myUser ,  $myPass);
return($con);
};

?>