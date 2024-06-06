<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "placement_records"; // Replace with your database name

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Get filter values
$year = $_POST['year'];
$sql="";

if($year==""){
    $sql = "SELECT c.company_name as Company, count(*) as Placed
    FROM placements_record pr, companys c
    where c.company_id=pr.company_id
    group by pr.company_id";
}
else{
    $sql = "SELECT c.company_name as Company, count(*) as Placed
    FROM placements_record pr, companys c
    where c.company_id=pr.company_id and pr.pass_out_year='$year'
    group by pr.company_id";
}

$result = $conn->query($sql);

$rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
}

$conn->close();

echo json_encode($rows);
?>