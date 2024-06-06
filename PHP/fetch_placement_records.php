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
$department = $_POST['department'];
$sql="";
if($year == "" && $department =="")
{
    $sql = "SELECT pr.student_name, pr.pass_out_year, d.department_name, c.company_name, pr.package
        FROM  placements_record pr
        JOIN departments d ON pr.department_id = d.department_id
        JOIN companys c ON pr.company_id = c.company_id
        ORDER BY pr.pass_out_year DESC ,pr.package DESC";
        
}

elseif($year == "")
{
    $sql ="SELECT pr.student_name, pr.pass_out_year, d.department_name, c.company_name, pr.package
    FROM placement_records pr
    JOIN departments d ON pr.department_id = d.department_id
    JOIN companies c ON pr.company_id = c.company_id
    WHERE pr.department_id = '$department'";
}

elseif($department =="")
{
    $sql = "SELECT pr.student_name, pr.pass_out_year, d.department_name, c.company_name, pr.package
        FROM  placements_record pr
        JOIN departments d ON pr.department_id = d.department_id
        JOIN companys c ON pr.company_id = c.company_id
        WHERE pr.pass_out_year = '$year'";
}

else{
// Build the SQL query
$sql = "SELECT pr.student_name, pr.pass_out_year, d.department_name, c.company_name, pr.package
        FROM  placements_record pr
        JOIN departments d ON pr.department_id = d.department_id
        JOIN companys c ON pr.company_id = c.company_id
        WHERE pr.pass_out_year = '$year' AND pr.department_id = '$department'";
}

$result = $conn->query($sql);

$rows = array();
if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $rows[] = $row;
    }
} 
// else {
//     echo json_encode([]);
// }

$conn->close();

echo json_encode($rows);
?>
