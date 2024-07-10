<?php
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "placement_records"; 

    $conn = new mysqli($servername, $username, $password, $dbname);

    if ($conn->connect_error) {
        die('Connection failed: ' . $conn->connect_error);
    }

    $targetDir = "book_folder/";

    if (isset($_FILES['file']) && $_FILES['file']['error'] == 0) {
        $fileid = $_POST['fileid']; // Get the fileid from the form
        $fileName = basename($_FILES["file"]["name"]);
        $targetPath = $targetDir . $fileName;

        if (move_uploaded_file($_FILES["file"]["tmp_name"], $targetPath)) {
            $sql = "UPDATE books SET filename='$fileName', filepath='$targetPath' WHERE fileid='$fileid'";
            if ($conn->query($sql) === TRUE) {
                echo "File uploaded and record updated successfully.";
            } else {
                echo "ERROR: " . $sql . " Error Details: " . $conn->error;
            }
        } else {
            echo "Error moving the file.";
        }
    } else {
        echo "File not uploaded.";
    }

    $conn->close();
?>
