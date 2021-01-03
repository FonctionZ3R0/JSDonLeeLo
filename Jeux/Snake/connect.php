<?php
$login = $_GET['login'];
$password = md5($_GET['password']);

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

$sql = "SELECT * FROM account";
$result = $conn->query($sql);
$userok = false;

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    if ($row["username"] == $login) {
      $userok = true;
      if ($row["password"] == $password) {
        echo "0Kc0mec710n0F".$login;
        return 0;
      }
    }
  }
  if ($userok) {
    echo "You may have forgotten your password .. ";
  }else {
    echo "You don't seem to be in our system ..";
  }
  
  
} else {
  echo "Our system is empty O.O";
}
$conn->close();

?>