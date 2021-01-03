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

$sql = "SELECT username, password FROM account";
$result = $conn->query($sql);

if ($result->num_rows > 0) {
  // output data of each row
  while($row = $result->fetch_assoc()) {
    if ($row["username"] == $login && $row["password"] == $password) {
      echo "you are allready in our system".$login." !";
    }else{
      $sql = "INSERT INTO account (username, password)
      VALUES ('".$login."', '".$password."')";

      if ($conn->query($sql) === TRUE) {
        echo $login.", You are registered !";
      } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
      }

      $conn->close();
      return 0;
    }
  }
} else {
  $sql = "INSERT INTO account (username, password) VALUES ('".$login."', '".$password."')";

  if ($conn->query($sql) === TRUE) {
    echo $login.", You are registered !";
  } else {
    echo "Error: " . $sql . "<br>" . $conn->error;
  }

  $conn->close();
}

?>