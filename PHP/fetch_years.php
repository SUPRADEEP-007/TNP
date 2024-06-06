<?php
// Assuming you have a database connection established
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "placement_records"; 

$connection = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($connection->connect_error) {
    die('Connection failed: ' . $connection->connect_error);
}

// Fetch distinct years from the placements_record table
$query = "SELECT DISTINCT pass_out_year AS year FROM placements_record ORDER BY pass_out_year DESC";
$result = $connection->query($query);

// Store years in an array
$years = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $years[] = $row;
    }
} 

$connection->close();

// Output years as JSON
echo json_encode($years);
?>
