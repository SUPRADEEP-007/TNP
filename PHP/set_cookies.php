<?php
session_start();
// Ensure that this script sets headers before any output
header('Content-Type: application/json');

// Get the input data
$data = json_decode(file_get_contents('php://input'), true);
$username = $data['username'];
$password = $data['password'];

// Set cookies
if (!isset($_COOKIE['username'])) {
    setcookie("username", $username, time() + 3600, "/", "", false, true);
}

if (!isset($_COOKIE['loggedin'])) {
    setcookie("loggedin", true, time() + 3600, "/", "", false, true);
}

// Return a response (optional)
$response = array('message' => 'Cookies set successfully');
echo json_encode($response);
?>
