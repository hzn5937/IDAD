<?php
require_once 'db_connection.php';

// get the HTTP method, path and body of the request
$method = $_SERVER['REQUEST_METHOD'];
$input = json_decode(file_get_contents('php://input'),true);

$username = $input['username'];
$password = $input['password'];

$table = "users";

$check_sql = "SELECT * FROM $table WHERE username = '$username'";
$check_result = $conn->query($check_sql);

if ($check_result->num_rows > 0) {
    http_response_code(406); // Conflict
    $response["message"] = "Username already exists";
    $response["alertColor"] = "error";
    echo json_encode($response, JSON_PRETTY_PRINT);
}


else
{
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
        $response["alertColor"] = "success";
        echo json_encode($response, JSON_PRETTY_PRINT);
    } else {
        http_response_code(500); // Server error
        $response["message"] = "Error: " . $sql . "<br>" . mysqli_error($conn);
        $response["alertColor"] = "error";
        echo json_encode($response, JSON_PRETTY_PRINT);
    }
}

// close mysql connection
mysqli_close($conn);

?>
