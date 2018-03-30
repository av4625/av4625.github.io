<?php
    include 'connection.php';

    // SQL query
    $query = 'SELECT temperature FROM spare_bedroom ORDER BY date_time DESC LIMIT 1';

    // Execute query
    $result = mysqli_query($connection, $query);

    $row = mysqli_fetch_row($result);

    // Put the results out encoded as json so I can read it using JavaScript
    echo $row[0];

    // Close the connection
    $connection->close();
?>
