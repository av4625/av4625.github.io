<?php
// Fields required to connect to the database
$host = "localhost";
$username = "website";
$password = "password";
$dbname = "house_temp";

// Create connection to MySQL database
$connection = new mysqli($host, $username, $password, $dbname);

// Check connection to MySQL database
if ($connection->connect_error)
{
    die("Connection to database failed: " . $connection->connect_error);
}
?>
