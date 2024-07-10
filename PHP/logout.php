<?php
session_start();
// Unset the cookies
setcookie("username", "", time() - 3600, "/");
setcookie("loggedin", "", time() - 3600, "/");
session_destroy();
exit();
?>
