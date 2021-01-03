<?php
$login = $_GET['login'];

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

$sql = "SELECT * FROM account ";
$result = $conn->query($sql);
while($row = $result->fetch_assoc()) {
  if ($row["username"] == $login) {
    echo "ok".$row["apples"];
    return 0;
  }
}
$conn->close();

?>