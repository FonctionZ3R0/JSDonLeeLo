<?php
$login = $_GET['login'];
$apples = $_GET['apples'];

$servername = "localhost";
$dbusername = "root";
$dbpassword = "";
$dbname = "snakeascii";

// Create connection
$conn = new mysqli($servername, $dbusername, $dbpassword, $dbname);

// Check connection
if ($conn->connect_error) {
  die("Connection failed: " . $conn->connect_error);
}

$sql = "UPDATE account SET apples=".$apples." WHERE username=\"".$login."\"";

if ($conn->query($sql) === TRUE) {
} else {
  echo "Error updating record: " . $conn->error;
}

$conn->close();

?>