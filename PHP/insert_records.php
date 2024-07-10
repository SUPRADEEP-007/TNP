<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "placement_records"; 

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }


    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        if (isset($_FILES['file']) && $_FILES['file']['error'] === UPLOAD_ERR_OK) {
            $fileTmpPath = $_FILES['file']['tmp_name'];
            $file = fopen($fileTmpPath, 'r');
            
            // Skip the first row if it contains headers
            $headers = fgetcsv($file);

            $success = true;
            $conn->begin_transaction();
            try {
                while (($row = fgetcsv($file)) !== FALSE) {
                    $student_id = $conn->real_escape_string($row[0]);
                    $student_name = $conn->real_escape_string($row[1]);
                    $department_id = $conn->real_escape_string($row[2]);
                    $pass_out_year = $conn->real_escape_string($row[3]);
                    $company_id = $conn->real_escape_string($row[4]);
                    $package = $conn->real_escape_string($row[5]);

                    $sql = "INSERT INTO placements_record (student_id, student_name, department_id, pass_out_year, company_id, package) 
                            VALUES ('$student_id', '$student_name', '$department_id', '$pass_out_year', '$company_id', '$package')";

                    if (!$conn->query($sql)) {
                        throw new Exception($conn->error);
                    }
                }
                $conn->commit();
            } catch (Exception $e) {
                $conn->rollback();
                $success = false;
                $errorMessage = $e->getMessage();
            }

            fclose($file);

            if ($success) {
                echo json_encode(['message' => 'Data inserted successfully']);
            } else {
                echo json_encode(['message' => 'Error inserting data: ' . $errorMessage]);
            }
        } else {
            echo json_encode(['message' => 'File upload error']);
        }
    } else {
        echo json_encode(['message' => 'Invalid request method']);
    }

    $conn->close();

?>