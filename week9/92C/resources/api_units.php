<?php
    require_once "db_connection.php";
    
    $method = $_SERVER["REQUEST_METHOD"];
    $input = json_decode(file_get_contents('php://input'),true);

    switch ($method)
    {
        case "GET":
            $result = array();
            $sql = "SELECT * FROM `units`";
            $result = $conn->query($sql);
            if ($result->num_rows > 0)
            {
                $units = array();
                while ($row = $result->fetch_assoc())
                {
                    $units[] = $row;
                }
                echo json_encode($units);
            }
            else
            {
                echo json_encode($result);
            }
            break;
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
            break;
        case "PUT":
            $result = array();
            $code = $input['code'];
            $desc = $input['desc'];
            $cp = $input['cp'];
            $type = $input['type'];
            $sql = "UPDATE `units` SET `description` = '$desc', cp = '$cp', type = '$type'
            WHERE code = '$code'";
            $result = $conn->query($sql);
            if ($result)
            {
                $response["success"] = "Unit updated successfully";
            }
            else
            {
                $response["error"] = "Error updating unit";
            }
            echo json_encode($response);
            break;
        case "DELETE":
            $result = array();
            $code = $input['code'];
            $sql = "DELETE FROM `units` WHERE code = '$code'";
            $result = $conn->query($sql);
            if ($result)
            {
                $response["success"] = "Unit deleted successfully";
            }
            else
            {
                $response["error"] = "Error deleting unit";
            }
            echo json_encode($response);
            break;
    }

?>