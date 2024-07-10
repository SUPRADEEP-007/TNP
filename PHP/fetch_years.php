<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "placement_records"; 

$connection = new mysqli($servername, $username, $password, $dbname);


if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
}

$query = "SELECT DISTINCT pass_out_year AS year FROM placements_record ORDER BY pass_out_year DESC";
$result = $connection->query($query);


$years = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $years[] = $row;
    }
} 

$connection->close();


echo json_encode($years);
?>
