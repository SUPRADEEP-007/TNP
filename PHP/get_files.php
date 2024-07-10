<?php

$servername = "localhost";
$username = "root";
$password = "";
$dbname = "placement_records"; 

$conn = new mysqli($servername, $username, $password, $dbname);


if ($conn->connect_error) {
    die('Connection failed: ' . $conn->connect_error);
}

$fileid = isset($_GET['fileid']) ? intval($_GET['fileid']) : 0;

$sql = "SELECT filename, filepath FROM books WHERE fileid = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("i", $fileid);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Fetch the file info
    $row = $result->fetch_assoc();
    $filename = $row['filename'];
    $filepath = $row['filepath'];

    // Set headers for file download
    header('Content-Description: File Transfer');
    header('Content-Type: application/octet-stream');
    header('Content-Disposition: attachment; filename=' . basename($filename));
    header('Expires: 0');
    header('Cache-Control: must-revalidate');
    header('Pragma: public');
    header('Content-Length: ' . filesize($filepath));

    // Output the file content
    readfile($filepath);
    exit;
} else {
    echo "File not found or error retrieving file information.";
}

$stmt->close();
$conn->close();
?>
