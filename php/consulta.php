<?php 

include 'dbcon.php';
$dbcon = conexion(); 

$query = "select id, hotel, direccion, zona, x, y, dbo.geomToGeoJSON(geom) as geometry from Hoteles";
$result = odbc_exec($dbcon,$query);

while($row = odbc_fetch_array($result)){

$properties[]= array(
	"id" => $row['id'],
	"hotel" => $row['hotel'],
	"direccion" => $row['direccion'],
	"zona" => $row['zona'],
	"x" => $row['x'],
	"y" => $row['y']);

$geometry[]= array(	
	"geometry" => $row['geometry']);
};

$response=array($properties,$geometry);

echo json_encode($response);


?>