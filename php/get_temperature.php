<?php
include 'connection.php';

// Array with rooms to get temperature from
$rooms = ['kitchen', 'bedroom', 'spare_bedroom', 'study'];
$data = [];

foreach ($rooms as $room)
{
    // MySQL query for current temperature and date
    $query = 'SELECT * FROM ' . $room . ' ORDER BY date_time DESC LIMIT 1';

    // Execute query
    $result = mysqli_query($connection, $query);
    $current_row = mysqli_fetch_row($result);

    // MySQL query for average temperature
    $average_query = 'SELECT AVG(temperature) FROM ' . $room;

    // Execute query
    $average_result = mysqli_query($connection, $average_query);
    $average_row = mysqli_fetch_row($average_result);

    $data[$room] = [
        'temperature' => $current_row[0],
        'date' =>  $current_row[1],
        'average_temperature' => $average_row[0]
    ];
}

echo(json_encode($data));

// Close the connection
$connection->close();
?>
