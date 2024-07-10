<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);

    // Validate username
    if (!preg_match('/@ptuniv\.edu\.in$/', $username)) {
        die("Error: Username must end with @ptuniv.edu.in");
    }

    $servername = "localhost";
    $db_username = "root";
    $db_password = "";
    $dbname = "placement_records";

    // Create connection
    $connection = new mysqli($servername, $db_username, $db_password, $dbname);

    // Check connection
    if ($connection->connect_error) {
        die('Connection failed: ' . $connection->connect_error);
    }

    // Prepare statement
    $stmt = $connection->prepare("SELECT password FROM reslogin WHERE username = ?");
    $stmt->bind_param("s", $username);
    $stmt->execute();
    $stmt->store_result();

    if ($stmt->num_rows > 0) {
        // Bind result
        $stmt->bind_result($storedHashedPassword);
        $stmt->fetch();

        // Verify password
        if (password_verify($password, $storedHashedPassword)) {
            // Password is correct, set cookie
            $cookie_name = "user_login";
            $cookie_value = $username;
            // Set cookie to expire in 1 hour (adjust as needed)
            $cookie_expire = time() + 3600; // 1 hour from now
            setcookie($cookie_name, $cookie_value, $cookie_expire, "/"); // '/' for the entire domain

            echo "Login successful!";
        } else {
            echo "Invalid username or password.";
        }
    } else {
        echo "Invalid username or password.";
    }

    $stmt->close();
    $connection->close();
}
?>
