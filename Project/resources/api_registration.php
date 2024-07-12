<?php
require_once 'db_connection.php';

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'),true);

$username = $input['username'];
$password = $input['password'];

$table = "users";

switch($method) 
{
    case "POST":
        $sql = "INSERT INTO $table (username, password) 
        VALUES ('$username', '$password')";
        break;
}

$result = mysqli_query($conn, $sql);
if ($result) {
    http_response_code(201); // Created
    $response["message"] = "User registered successfully";
    echo json_encode($response, JSON_PRETTY_PRINT);
} else {
    http_response_code(500); // Server error
    $response["message"] = "Error: " . $sql . "<br>" . mysqli_error($conn);
    echo json_encode($response, JSON_PRETTY_PRINT);
}

// close mysql connection
mysqli_close($conn);

?>
