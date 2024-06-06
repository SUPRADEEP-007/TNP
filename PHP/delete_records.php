<?php
    // Database connection (update with your credentials)
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "placement_records"; 

    // Create connection
    $conn = new mysqli($servername, $username, $password, $dbname);

    // Check connection
    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }

    // Get filter values
    $year = isset($_POST['year']) ? $_POST['year'] : '';
    $department = isset($_POST['department']) ? $_POST['department'] : '';

    // Construct SQL query based on filters
    if (empty($year) && empty($department)) {
        $sql = "DELETE FROM placements_record";
    } elseif (empty($department)) {
        $sql = "DELETE FROM placements_record WHERE pass_out_year='$year'";
    } elseif (empty($year)) {
        $sql = "DELETE FROM placements_record WHERE department_id='$department'";
    } else {
        $sql = "DELETE FROM placements_record WHERE pass_out_year='$year' AND department_id='$department'";
    }

    // Execute the query
    if ($conn->query($sql) === TRUE) {
        echo 'Records deleted successfully';
    } else {
        echo 'Error deleting records: ' . $conn->error;
    }

    // Close the connection
    $conn->close();
?>
