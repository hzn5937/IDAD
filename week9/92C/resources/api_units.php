<?php
    require_once "db_connection.php";
    
    $method = $_SERVER["REQUEST_METHOD"];
    $input = json_decode(file_get_contents('php://input'),true);

    switch ($method)
    {
        case "POST":
            $result = array();
            $code = $input['code'];
            $desc = $input['desc'];
            $sql = "SELECT * FROM `units` 
            WHERE code = '$code' OR `description` = '$desc'";
            $result = $conn->query($sql);
            if ($result->num_rows > 0)
            {
                $response["error"] = "Code or description already exists";
            }
            else
            {
                $cp = $input['cp'];
                $type = $input['type'];
                $sql = "INSERT INTO `units` (code, `description`, cp, type)
                VALUES ('$code', '$desc', '$cp', '$type')";
                $result = $conn->query($sql);
                if ($result)
                {
                    $response["success"] = "Unit added successfully";
                }
                else
                {
                    $response["error"] = "Error adding unit";
                }
            }
            echo json_encode($response);

    }

?>