<?php
session_start();
$_SESSION = array(); // Unset all session variables
session_destroy(); // Destroy the session
setcookie("user_login", "", time() - 3600, "/"); // Clear the user_login cookie
echo "Session and cookies destroyed successfully."; // Optional: Response message
?>
