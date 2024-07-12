<?php
// Database configuration
$host = "localhost"; // Your database host
$username = "root"; // Your database username
$password = ''; // Your database password
$db_name = "dev"; // Your database name

$conn = new mysqli($host, $username, $password, $db_name);

mysqli_set_charset($conn,'utf8');
?>
