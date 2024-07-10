<?php

class Database {
    private $servername = "localhost";
    private $username = "root";
    private $password = "";
    private $dbname = "placement_records";
    private $connection;

    // Constructor to establish database connection
    public function __construct() {
        $this->connection = new mysqli($this->servername, $this->username, $this->password, $this->dbname);

        if ($this->connection->connect_error) {
            die("Connection failed: " . $this->connection->connect_error);
        }
    }

    // Method to handle user registration
    public function registerUser($username, $password) {
        // Validate username format
        if (!preg_match('/@ptuniv\.edu\.in$/', $username)) {
            die("Error: Username must end with @ptuniv.edu.in");
        }

        // Hash the password
        $hashedPassword = password_hash($password, PASSWORD_DEFAULT);

        // Prepare statement to prevent SQL injection
        $stmt = $this->connection->prepare("INSERT INTO reslogin (username, password) VALUES (?, ?)");

        // Bind parameters
        $stmt->bind_param("ss", $username, $hashedPassword);

        // Execute the statement
        if ($stmt->execute()) {
            echo "User successfully registered.";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement
        $stmt->close();
    }

    // Destructor to close database connection
    public function __destruct() {
        $this->connection->close();
    }
}

// Create an instance of the Database class
$database = new Database();

// Check if form submitted via POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = $_POST['username'];
    $password = $_POST['password'];

    // Call the registerUser method
    $database->registerUser($username, $password);
}

?>
