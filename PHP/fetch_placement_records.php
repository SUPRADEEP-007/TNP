<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "placement_records"; 

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

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
    FROM placements_record pr
    JOIN departments d ON pr.department_id = d.department_id
    JOIN companys c ON pr.company_id = c.company_id
    WHERE pr.department_id = '$department'";
}

elseif($department == "")
{
    $sql = "SELECT pr.student_name, pr.pass_out_year, d.department_name, c.company_name, pr.package
        FROM  placements_record pr
        JOIN departments d ON pr.department_id = d.department_id
        JOIN companys c ON pr.company_id = c.company_id
        WHERE pr.pass_out_year = '$year'";
}

else{
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


$conn->close();

echo json_encode($rows);
?>
