<?php
include 'connection.php';

// Array with rooms to get temperature from
$rooms = ['kitchen', 'bedroom', 'spare_bedroom', 'study'];
$data = [];

foreach ($rooms as $room)
{
    // SQL query
    $query = 'SELECT * FROM ' . $room . ' ORDER BY date_time DESC LIMIT 1';

    // Execute query
    $result = mysqli_query($connection, $query);

    $row = mysqli_fetch_row($result);

    $data[$room] = ['temperature' => $row[0], 'date' =>  $row[1]];
}

echo(json_encode($data));

// Close the connection
$connection->close();
?>
