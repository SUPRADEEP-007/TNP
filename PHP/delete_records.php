<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "placement_records"; 

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }

    $year = isset($_POST['year']) ? $_POST['year'] : '';
    $department = isset($_POST['department']) ? $_POST['department'] : '';

    if (empty($year) && empty($department)) {
        $sql = "DELETE FROM placements_record";
    } elseif (empty($department)) {
        $sql = "DELETE FROM placements_record WHERE pass_out_year='$year'";
    } elseif (empty($year)) {
        $sql = "DELETE FROM placements_record WHERE department_id='$department'";
    } else {
        $sql = "DELETE FROM placements_record WHERE pass_out_year='$year' AND department_id='$department'";
    }

    if ($conn->query($sql) === TRUE) {
        echo 'Records deleted successfully';
    } else {
        echo 'Error deleting records: ' . $conn->error;
    }

    $conn->close();
?>
